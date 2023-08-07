import axios from "axios";

const expenseMateApi = axios.create({
    baseURL: 'http://192.168.1.73:3001',
})


export default expenseMateApi;