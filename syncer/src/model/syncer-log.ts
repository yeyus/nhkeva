import { Serializable } from "./serializable";
import { SyncerRun } from "./syncer-run";

export class SyncerLog implements Serializable {
    runs: Array<SyncerRun> = [];
    dateCreated: number;
    dateModified: number;

    constructor() {
        this.dateCreated = Date.now();
        this.dateModified = 0;
    }

    static fromJSON(json: any) {
        const o = new SyncerLog();
        const { runs = [], dateCreated, dateModified } = json;
        
        runs.forEach((run : any) => {
            o.runs.push(SyncerRun.fromJSON(run));    
        });

        o.dateCreated = dateCreated;
        o.dateModified = dateModified;

        return o;
    }

    add(run: SyncerRun) {
        this.runs.push(run);
        this.dateModified = Date.now();
    }

    getLatestAssetIngestion() : number {
        return this.runs.reduce((prev, curr) => Math.max(prev, curr.latestAssetCreation), 0);
    }

    /** Serializable */
    serialize(): string {
        return JSON.stringify(this);
    }

    deserialize(buffer: string): void {
        const json = JSON.parse(buffer);
        const o = SyncerLog.fromJSON(json);
        this.dateCreated = o.dateCreated;
        this.dateModified = o.dateModified;
        this.runs = o.runs;
    }
}