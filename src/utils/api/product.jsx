import {APICore} from './APICore'
import {RToast} from "../../components";

const api = new APICore()

function get(params) {
    const baseUrl = '/product'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result
    })
}

async function store(params) {
    const baseUrl = '/product'
    return api.createWithFile(baseUrl, params).then((resp) => {
        const {message, result} = resp
        RToast(message, 'success');
        return result;
    }).catch((error) => {
        return error;
    });
}

function update(params) {
    const baseUrl = `/product/${params.id}`
    return api.update(baseUrl, params).then((resp) => {
        const {message} = resp
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    });
}

function destroy(id) {
    const baseUrl = `/product/${id}`
    return api.delete(baseUrl).then((resp) => {
        const {message} = resp
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    });
}

export {get, store, update, destroy}