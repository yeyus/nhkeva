import { SyncerRun } from "./syncer-run";

describe('SyncerRun', () => {

    beforeEach(() => {
        jest
            .useFakeTimers()
            .setSystemTime(new Date('2020-01-01').getTime());
    });

    it('should create an empty object', () => {
        const o = new SyncerRun();

        expect(o.startTime).toMatchInlineSnapshot(`1577836800000`);
        expect(o.endTime).toBe(undefined);
        expect(o.addedAssets).toEqual([]);
        expect(o.latestAssetCreation).toEqual(0);
    });

    it('should set end time on finish', () => {
        const o = new SyncerRun();
        jest.setSystemTime(new Date('2020-01-02').getTime());

        o.finish();

        expect(o.startTime).toMatchInlineSnapshot(`1577836800000`);
        expect(o.endTime).toMatchInlineSnapshot(`1577923200000`);
    });

    it('should parse from JSON', () => {
        const json = {
            startTime: 1642015617120,
            endTime: 1642015634739,
            addedAssets: ["abc", "cde"],
            latestAssetCreation: 1642015617120
        };

        const o = SyncerRun.fromJSON(json);
        expect(o).toMatchInlineSnapshot(`
SyncerRun {
  "addedAssets": Array [
    "abc",
    "cde",
  ],
  "endTime": 1642015634739,
  "latestAssetCreation": 1642015617120,
  "startTime": 1642015617120,
}
`);
    });

    it('should add a new item', () => {
        const o = new SyncerRun();
        o.add('abc', 1642015617120);

        expect(o.addedAssets).toContain('abc');
        expect(o.latestAssetCreation).toEqual(1642015617120);
    });

    it('should print to string', () => {
        const o = new SyncerRun();
        o.add('abc', 1642015617120);
        jest.setSystemTime(new Date('2020-01-02').getTime());
        o.finish();

        expect(o.toString()).toMatchInlineSnapshot(`"SyncerRun[startTime=1/1/2020, 12:00:00 AM duration=86400000ms ids=abc]"`);
    });
});