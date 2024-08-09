import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/user'
    return api.get(baseUrl, params)
}

function store(params: {fullname: string, email: string, username: string, password: string, role: string, phone: string, image: string}){
    const baseUrl = '/user';
    return api.create(baseUrl, params)
}

function update(params: {id: string, fullname: string, email: string, username: string, password: string, role: string, phone: string, image: string}){
    const baseUrl = `/user/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/user/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
