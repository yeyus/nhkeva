import axios from 'axios';

export class Zinc {
    constructor(public host: string, public user: string, public password: string) {}

    async ingest(index: string, id: string, data: any) {
        const url = `${this.host}/api/${index}/document`;
        
        data._id = id;
        
        return await axios.put(url, data, {
            auth: {
                username: this.user,
                password: this.password
            }
        });
    }
}