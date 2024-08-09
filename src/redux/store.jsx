import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// saga
import rootSaga from './sagas'
import Order from "./order/reducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// mount it on the store
export const store = configureStore({
    reducer: {
        order: Order
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(middleware),
})

// run the saga
sagaMiddleware.run(rootSaga)