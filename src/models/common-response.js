export default class CommonResponse {
    constructor(status, message, datas) {
        this.status = status;
        this.message = message;
        this.datas = datas;
    }
}