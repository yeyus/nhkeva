import axios from 'axios';
import { JStreamAPI, WSAssetRequest, SortDirection } from '.';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('JStream API', () => {
    test('WsAsset', async () => {
        const apiInstance = new JStreamAPI('http://api.test', 'test-api-key');

        mockedAxios.get.mockResolvedValueOnce({
            "data": {
                "response": {
                    "success": {
                        "code": 1225,
                        "message": "Asset file(s) found",
                        "details": ""
                    },
                    "WsAssetResponse": {
                    }
                }
            }
        });

        const request = new WSAssetRequest(100, 20);
        request.title = '%[nhkworld]vod%';
        request.sortdir = SortDirection.Ascending;

        const response = await apiInstance.wsAsset(request);

        expect(mockedAxios.get).toHaveBeenCalledWith('http://api.test/ws_asset/api/test-api-key/mode/json/apiv/5?title=%25%5Bnhkworld%5Dvod%25&sortdir=asc&start=100&end=120');
        expect(response).toMatchInlineSnapshot(`
JStreamAPIResponse {
  "response": Object {},
  "success": Object {
    "code": 1225,
    "details": "",
    "message": "Asset file(s) found",
  },
}
`);
    });
});