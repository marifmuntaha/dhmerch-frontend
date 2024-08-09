import {OrderActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    order: false,
    error: false,
    success: false,
}
const Order = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case OrderActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case OrderActionTypes.GET_ORDER:
                    return {
                        ...state,
                        orders: action.payload.data.result,
                        loading: false,
                    }
                case OrderActionTypes.STORE_ORDER:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        order: action.payload.data.result,
                    }
                case OrderActionTypes.UPDATE_ORDER:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        order: action.payload.data.result,
                    }
                case OrderActionTypes.DESTROY_ORDER:
                    return {
                        ...state,loading: false,
                        success: action.payload.data.message,
                        order: action.payload.data.result,
                    }
                default:
                    return {...state}
            }
        }
        case OrderActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case OrderActionTypes.GET_ORDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case OrderActionTypes.STORE_ORDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case OrderActionTypes.UPDATE_ORDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case OrderActionTypes.DESTROY_ORDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case OrderActionTypes.GET_ORDER:
            return {
                ...state,
                loading: true,
            }
        case OrderActionTypes.ADD_ORDER:
            return {
                ...state,
                loading: false,
            }
        case OrderActionTypes.STORE_ORDER:
            return {
                ...state,
                loading: true,
            }
        case OrderActionTypes.SET_ORDER:
            return {
                ...state,
                loading: false,
                order: action.payload.order,
            }
        case OrderActionTypes.UPDATE_ORDER:
            return {
                ...state,
                loading: true,
            }
        case OrderActionTypes.DESTROY_ORDER:
            return {
                ...state,
                loading: action.payload.params,
            }
        case OrderActionTypes.RESET:
            return {
                ...state,
                loading: false,
                order: false,
                error: false,
                success: false,
            }
        default:
            return {...state}
    }
}
export default Order;