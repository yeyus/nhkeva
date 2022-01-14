import { SyncerLog } from "./syncer-log";
import { SyncerRun } from "./syncer-run";

describe('SyncerLog', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    
    it('should create a new log', () => {
        const o = new SyncerLog();

        expect(o).toMatchInlineSnapshot(`
SyncerLog {
  "dateCreated": 1642044086082,
  "dateModified": 0,
  "runs": Array [],
}
`);
    });

    it('should add a new run', () => {
        const o = new SyncerLog();
        const run = new SyncerRun();
        run.add('abc', 1642015617120);
        run.finish();

        o.add(run);

        jest.setSystemTime(new Date('2020-01-02').getTime());
        
        expect(o).toMatchInlineSnapshot(`
SyncerLog {
  "dateCreated": 1642044086082,
  "dateModified": 1642044086082,
  "runs": Array [
    SyncerRun {
      "addedAssets": Array [
        "abc",
      ],
      "endTime": 1642044086082,
      "latestAssetCreation": 1642015617120,
      "startTime": 1642044086082,
    },
  ],
}
`);
    });

    it('should create object from JSON', () => {
        const o = SyncerLog.fromJSON({
            dateCreated: 1,
            dateModified: 2,
            runs: [{
                startTime: 10,
                endTime: 20,
                addedAssets: ['abc', 'cde']
            }]
        });

        expect(o).toMatchInlineSnapshot(`
SyncerLog {
  "dateCreated": 1,
  "dateModified": 2,
  "runs": Array [
    SyncerRun {
      "addedAssets": Array [
        "abc",
        "cde",
      ],
      "endTime": 20,
      "latestAssetCreation": undefined,
      "startTime": 10,
    },
  ],
}
`);
    });

    it('should serialize to string', () => {
        const o = new SyncerLog();
        const run = new SyncerRun();
        run.add('abc', 1642015617120);
        run.finish();

        o.add(run);

        expect(o.serialize()).toMatchInlineSnapshot(`"{\\"runs\\":[{\\"addedAssets\\":[\\"abc\\"],\\"latestAssetCreation\\":1642015617120,\\"startTime\\":1577923200000,\\"endTime\\":1577923200000}],\\"dateCreated\\":1577923200000,\\"dateModified\\":1577923200000}"`);
    });

    it('should deserialize from string to object', () => {
        const json = JSON.stringify({
            dateCreated: 1,
            dateModified: 2,
            runs: [{
                startTime: 10,
                endTime: 20,
                addedAssets: ['abc', 'cde']
            }]
        });

        const o = new SyncerLog();
        o.deserialize(json);

        expect(o).toMatchInlineSnapshot(`
SyncerLog {
  "dateCreated": 1,
  "dateModified": 2,
  "runs": Array [
    SyncerRun {
      "addedAssets": Array [
        "abc",
        "cde",
      ],
      "endTime": 20,
      "latestAssetCreation": undefined,
      "startTime": 10,
    },
  ],
}
`);
    });
});