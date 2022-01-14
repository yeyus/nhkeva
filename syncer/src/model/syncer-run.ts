export class SyncerRun {
    startTime: number;
    endTime?: number;
    addedAssets: Array<String> = [];
    latestAssetCreation: number = 0;

    constructor() {
        this.startTime = Date.now();
    }

    static fromJSON(json: any) {
        const o = new SyncerRun();
        const { startTime, endTime, addedAssets, latestAssetCreation } = json;
        o.startTime = startTime;
        o.endTime = endTime;
        o.addedAssets = addedAssets;
        o.latestAssetCreation = latestAssetCreation;

        return o;
    }

    add(id: string, createTimestamp: number) {
        this.addedAssets.push(id);
        this.latestAssetCreation = Math.max(this.latestAssetCreation, createTimestamp);
    }

    finish() {
        this.endTime = Date.now();
    }

    toString() {
        const duration = (this.endTime || this.startTime - 1) - this.startTime;
        return `SyncerRun[startTime=${new Date(this.startTime).toLocaleString()} duration=${duration}ms ids=${this.addedAssets}]`;
    }
}