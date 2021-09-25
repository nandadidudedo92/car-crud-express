import CommonResponse from "../models/common-response";

export default class CommonResponseGenerator {

     commonSuccessGenerator(message, datas) {
        const response = new CommonResponse()
        response.status = '200';
        response.message = message;
        response.datas = datas;

        return response;
     }
    
    commonFailedGenerator(message) {
        const response = new CommonResponse()
        response.status = '500';
        response.message = message;

        return response;
    }

}

