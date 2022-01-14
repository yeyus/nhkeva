import { JStreamAPISuccess, JStreamAPIFailure } from './api-common';

/*
{
    "response": {
        "success": {
            "code": 1225,
            "message": "Asset file(s) found",
            "details": ""
        },
        "T": {
        }
    }
}
*/

export class JStreamAPIResponse<T> {
    success?: JStreamAPISuccess;
    failure?: JStreamAPIFailure;
    response?: T

    constructor(json: any) {
        const { response = {} } = json;
        const { success, failure, WsAssetResponse } = response;

        if (success) {
            this.success = success;
        } else if (failure) {
            this.failure = failure;
        } else {
            throw new Error("Unknown response structure");
        }

        if (WsAssetResponse != null) {
            this.response = WsAssetResponse;
        }
    }
}