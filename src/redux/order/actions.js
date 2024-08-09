import {OrderActionTypes} from "./constants";

export const orderApiResponseSuccess = (actionType, data) => ({
    type: OrderActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const orderApiResponseError = (actionType, error) => ({
    type: OrderActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getOrders = (params) => ({
    type: OrderActionTypes.GET_ORDER,
    payload: {params},
});

export const addOrder = (modal) => ({
    type: OrderActionTypes.ADD_ORDER,
    payload: {modal}
})

export const storeOrder = ({formData: {nama, whatsapp, produk, ukuran, warna, lengan, pembayaran}}): any => ({
    type: OrderActionTypes.STORE_ORDER,
    payload: {nama, whatsapp, produk, ukuran, warna, lengan, pembayaran},
})

export const setOrder = (order) => ({
    type: OrderActionTypes.SET_ORDER,
    payload: {order},
})

export const updateOrder = ({formData: {id, nama, whatsapp, produk, ukuran, warna, lengan, pembayaran}}) => ({
    type: OrderActionTypes.UPDATE_ORDER,
    payload: {id, nama, whatsapp, produk, ukuran, warna, lengan, pembayaran},
})

export const destroyOrder = (params) => ({
    type: OrderActionTypes.DESTROY_ORDER,
    payload: {params},
});

export const resetOrder = () => ({
    type: OrderActionTypes.RESET,
    payload: {}
})