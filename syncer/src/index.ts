import config from 'config';
import { createClient } from 'redis';
import { Asset, Comparator, JStreamAPI, SortDirection, WSAssetRequest } from './api/jstream';
import { SyncerLog } from './model/syncer-log';
import { SyncerRun } from './model/syncer-run';
import { Zinc } from './service/zinc';

const MAX_RETRIES = 3;
const STRIDE = process.env.STRIDE && parseInt(process.env.STRIDE) || 50;
const SYNCERLOG_REDIS_KEY = 'syncerlog-latest';
const ASSETS_ZINC_INDEX = 'assets';

function initializeRequest(stride: number, log: SyncerLog) : WSAssetRequest {
    const request = new WSAssetRequest(0, stride);
    request.title = '%[nhkworld]vod%';
    request.sortdir = SortDirection.Ascending;
    request.assetfiles = true;

    const latestAsset = log.getLatestAssetIngestion();
    if (latestAsset > 0) {
        request.dateAdd = new Date(log.getLatestAssetIngestion()).toISOString();
        request.dateAddComp = Comparator.GREATER_THAN;
    }

    return request;
}

async function getLog(client: any) : Promise<SyncerLog> {
    debugger;
    let log = new SyncerLog();
    const buffer = await client.get(SYNCERLOG_REDIS_KEY);
    if (!buffer) {
        return log;
    }

    log.deserialize(buffer);

    return log;
}

async function saveLog(client: any, log: SyncerLog) {
    await client.set(SYNCERLOG_REDIS_KEY, log.serialize());
}

async function processAsset(redis: any, zinc: Zinc, run: SyncerRun, asset: Asset) {
    const key = `asset-${asset.assetid}`;
    await redis.set(key, JSON.stringify(asset), { NX: true });
    await zinc.ingest(ASSETS_ZINC_INDEX, key, asset);
    run.add(key, Date.parse(asset.dateadd));
    return key;
}

async function main() {
    const api = new JStreamAPI(config.get<string>('nhk.host'), config.get<string>('nhk.apiKey'));
    const redis = createClient({ url: config.get<string>('redis.host') });
    const zinc = new Zinc(config.get<string>('zinc.host'), config.get<string>('zinc.user'), config.get<string>('zinc.password'));
    
    redis.on('error', (err) => {
        console.error('[Redis] Client Error:', err);
        process.exit(1);
    });
    
    await redis.connect();
    console.log(`[Redis] Connected`);

    const log = await getLog(redis);
    const run = new SyncerRun();

    const request = initializeRequest(STRIDE, log);
    let end = STRIDE;
    let retries = 0;
    let total = 0;
    while (request.start < end) {        
        try {
            const data = await api.wsAsset(request);
            if (data.failure) {
                console.log(`Failed request for for start=${request.start} and end=${request.end}, retries=${retries}: ${JSON.stringify(data.failure)}`);
                if (retries > MAX_RETRIES) {
                    console.log(`Max number of retries reached for start=${request.start} and end=${request.end}`);
                    break;
                }
                retries++;
                continue;
            }
    
            for (let i = 0; i < (data.response?.asset.length || 0); i++) {
                const asset = data.response?.asset[i];
                if (asset) {
                    const key = await processAsset(redis, zinc, run, asset);
                    console.log(`[syncer] ${i+request.start}/${end} saving asset ${key}`);
                    total++;
                }
            }
    
            // reset retries after a success
            retries = 0;

            end = Math.max(end, data.response?.totalCount || 0);

        } catch (e) {
            // in case of exception we do the same
            console.log(`Failed request for for start=${request.start} and end=${request.end}, retries=${retries}: ${e}`);
            if (retries > MAX_RETRIES) {
                console.log(`Max number of retries reached for start=${request.start} and end=${request.end}`);
                break;
            }
            retries++;
            continue;
        }
        
        request.next();        
    }

    run.finish();
    console.log(`Processed ${total} entities`);
    console.log(`Finished run: ${run}`);
    log.add(run);
    saveLog(redis, log);

    redis.quit();
}

main().then(console.log, console.error);