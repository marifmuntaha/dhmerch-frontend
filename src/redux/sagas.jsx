import { all } from 'redux-saga/effects'

import orderSaga from './order/saga'

export default function* rootSaga(){
    yield all([
        orderSaga()
        ])
}