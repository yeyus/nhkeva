import axios from 'axios';
import { URL } from 'node:url';
import { JStreamAPIResponse } from './api-response'
import { WSAssetRequest, WSAssetResponse } from './api-wsasset';

export class JStreamAPI {
    constructor(public host: string, public apiKey: string) {}

    async wsAsset(request: WSAssetRequest) {
        const url = new URL(`${this.host}/ws_asset/api/${this.apiKey}/mode/json/apiv/5`);

        request.appendToQueryString(url);
        const response = await axios.get(url.href);
        const result = new JStreamAPIResponse<WSAssetResponse>(response.data);
        return result;
    }
}