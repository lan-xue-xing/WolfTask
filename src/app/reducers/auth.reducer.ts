import * as FormAuthAction from '../actions/auth.action';
import { Auth } from '../models';

export const initialState: Auth = {};

export function reducer(state = initialState, action: FormAuthAction.Actions): Auth {
    switch (action.type) {
        case FormAuthAction.ActionTypes.REGISTER_SUCCESS:
        case FormAuthAction.ActionTypes.LOGIN_SUCCESS: {
            return {
                ...<Auth>action.payload
            };
        }
        case FormAuthAction.ActionTypes.REGISTER_FAIL:
        case FormAuthAction.ActionTypes.LOGIN_FAIL: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
