import axios, { AxiosInstance } from "axios";
import CONFIGS from "../../config/config";


export interface HttpManager {
    get(url: string): Promise<any>;
    post(url: string, body?: object, config?: object): Promise<any>;
}

export class AxiosHttp implements HttpManager {

    private http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: CONFIGS.EXPENSEMATE.BASE_URL,
            timeout: CONFIGS.REQUEST_TIMEOUT_MS,
        })
    }


    get(url: string): Promise<any> {
        throw new Error("Method not implemented.");
    }


    post(url: string, body: object, config: object): Promise<any> {
        return this.http.post(url, body)
    }


}