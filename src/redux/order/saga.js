
import {SagaIterator} from "redux-saga";
import {orderApiResponseError, orderApiResponseSuccess} from "./actions";
import {OrderActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../utils/api/order'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data;
        yield put(orderApiResponseSuccess(OrderActionTypes.GET_ORDER, data))
    } catch (error){
        yield put(orderApiResponseError(OrderActionTypes.GET_ORDER, error))
    }
}

function* store({payload: {nama, whatsapp, produk, ukuran, warna, lengan, pembayaran}}): SagaIterator {
    try {
        const response = yield call(storeApi, {nama, whatsapp, produk, ukuran, warna, lengan, pembayaran});
        const data = response && response.data;
        yield put(orderApiResponseSuccess(OrderActionTypes.STORE_ORDER, data));
    } catch (error){
        yield put(orderApiResponseError(OrderActionTypes.STORE_ORDER, error))
    }
}

function* update({payload: {id, nama, whatsapp, produk, ukuran, warna, lengan, pembayaran}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, nama, whatsapp, produk, ukuran, warna, lengan, pembayaran});
        const data = response && response.data;
        yield put(orderApiResponseSuccess(OrderActionTypes.UPDATE_ORDER, data));
    } catch (error){
        yield put(orderApiResponseError(OrderActionTypes.UPDATE_ORDER, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data;
        yield put(orderApiResponseSuccess(OrderActionTypes.DESTROY_ORDER, data))
    } catch (error){
        yield put(orderApiResponseError(OrderActionTypes.DESTROY_ORDER, error))
    }
}

export function* watchGetOrders() {
    yield takeEvery(OrderActionTypes.GET_ORDER, get);
}

export function* watchStoreOrder() {
    yield takeEvery(OrderActionTypes.STORE_ORDER, store);
}

export function* watchUpdateOrder() {
    yield takeEvery(OrderActionTypes.UPDATE_ORDER, update);
}

export function* watchDestroyOrder() {
    yield takeEvery(OrderActionTypes.DESTROY_ORDER, destroy);
}
function* orderSaga(){
    yield all([fork(watchGetOrders), fork(watchStoreOrder), fork(watchUpdateOrder), fork(watchDestroyOrder)])
}

export default orderSaga;