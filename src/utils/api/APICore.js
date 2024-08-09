import axios from 'axios'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message

        if (error && error.response && error.response.status === 404) {
            message = 'Sorry! the data you are looking for could not be found'
        } else if (error && error.response && error.response.status === 403) {
            message = 'Access Forbidden'
        } else {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials'
                    break
                case 403:
                    message = 'Access Forbidden'
                    break
                case 404:
                    message = 'Sorry! the data you are looking for could not be found'
                    break
                default: {
                    message = error.response && error.response.data ? error.response.data['message'] : error.message || error
                }
            }
        }
        return Promise.reject(message)
    }
)

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    else delete axios.defaults.headers.common['Authorization']
}

const getUserFromCookie = () => {
    const user = sessionStorage.getItem('user')
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null
}

class APICore {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let response
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
            response = axios.get(`${url}?${queryString}`, params)
        } else {
            response = axios.get(`${url}`, params)
        }
        return response
    }

    getFile = (url, params) => {
        let response
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
            response = axios.get(`${url}?${queryString}`, {responseType: 'blob'})
        } else {
            response = axios.get(`${url}`, {responseType: 'blob'})
        }
        return response
    }

    getMultiple = (urls, params) => {
        const reqs = []
        let queryString = ''
        if (params) {
            queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : ''
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`))
        }
        return axios.all(reqs)
    }

    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data)
    }

    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(url, data)
    }

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(url, data)
    }

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(url)
    }

    /**
     * post given data to url with file
     */
    createWithFile = (url, data) => {
        const formData = new FormData()
        for (const k in data) {
            formData.append(k, data[k])
        }

        const config = {
            headers: {
                ...axios.defaults.headers.common,
                'content-type': 'multipart/form-data',
            },
        }
        return axios.post(url, formData, config)
    }

    /**
     * post given data to url with file
     */
    updateWithFile = (url, data) => {
        const formData = new FormData()
        for (const k in data) {
            formData.append(k, data[k])
        }

        const config = {
            headers: {
                ...axios.defaults.headers.common,
                'content-type': 'multipart/form-data',
            },
        }
        return axios.patch(url, formData, config)
    }

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser()

        if (!user) {
            return false
        }
        const decoded = user.token
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
            console.warn('access token expired')
            return false
        } else {
            return true
        }
    }

    setLoggedInUser = (session) => {
        session
            ? sessionStorage.setItem('user', JSON.stringify(session))
            : sessionStorage.removeItem('user')
    }
    /**
     * Returns the logged-in user
     */
    getLoggedInUser = () => {
        return getUserFromCookie();
    }

    setUserInSession = (modifiedUser) => {
        const userInfo = sessionStorage.getItem('user')
        if (userInfo) {
            const {token, user} = JSON.parse(userInfo)
            this.setLoggedInUser({token, ...user, ...modifiedUser})
        }
    }
}

/*
Check if token available in session
*/
const user = getUserFromCookie()
if (user) {
    const {token} = user
    if (token) {
        setAuthorization(token)
    }
}

export {APICore, setAuthorization}
