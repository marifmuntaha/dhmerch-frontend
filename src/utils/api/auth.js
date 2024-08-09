import {APICore} from './APICore'

const api = new APICore()

// account
function login(params: { username: string; password: string }) {
    const baseUrl = '/auth/login/'
    return api.create(`${baseUrl}`, params)
}

function logout() {
    const baseUrl = '/auth/logout/'
    return api.create(`${baseUrl}`, {})
}

function forgotPassword(params: { username: string }) {
    const baseUrl = '/forgot-password/'
    return api.create(`${baseUrl}`, params)
}

export {login, logout, forgotPassword}
