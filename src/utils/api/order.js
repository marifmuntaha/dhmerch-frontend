import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/order'
    return api.get(baseUrl, params)
}

function store(params: {nama: string, whatsapp: string, produk: string, ukuran: string, warna: string, lengan: string, pembayaran: string}){
    const baseUrl = '/order';
    return api.createWithFile(baseUrl, params)
}

function update(params: {id: string, nama: string, whatsapp: string, produk: string, ukuran: string, warna: string, lengan: string, pembayaran: string}){
    const baseUrl = `/order/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/order/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
