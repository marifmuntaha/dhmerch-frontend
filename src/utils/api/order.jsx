import {APICore} from './APICore'
import {RToast} from "../../components";

const api = new APICore()

function get(params) {
    const baseUrl = '/order'
    return api.get(baseUrl, params).then((resp) => {
        return resp.result
    })
}

async function store(params) {
    const baseUrl = '/order'
    return api.create(baseUrl, params).then((resp) => {
        const {message, result} = resp
        RToast(message, 'success');
        return result;
    }).catch(() => {
        throw new Error()
    });
}

function update(params) {
    const baseUrl = `/order/${params.id}`
    return api.update(baseUrl, params).then((resp) => {
        const {message} = resp
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    });
}

function destroy(id) {
    const baseUrl = `/order/${id}`
    return api.delete(baseUrl).then((resp) => {
        const {message} = resp
        RToast(message, 'success');
    }).catch(() => {
        throw new Error()
    });
}

export {get, store, update, destroy}