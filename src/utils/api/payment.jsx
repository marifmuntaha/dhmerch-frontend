import {APICore} from './APICore'
import {RToast} from "../../components";

const api = new APICore()

export function store(params) {
    const baseUrl = '/payment/midtrans/create'
    return api.create(baseUrl, params).then((resp) => {
        const {message, result} = resp
        RToast(message, 'success');
        return result;
    }).catch((error) => {
        throw new Error(error)
    });
}

export function storePublic(params) {
    const baseUrl = '/public/payment/midtrans/create'
    return api.create(baseUrl, params).then((resp) => {
        const {message, result} = resp
        RToast(message, 'success');
        return result;
    }).catch((error) => {
        throw new Error(error)
    });
}