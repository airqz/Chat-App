import { authConstants } from "../actions/constants";

const initstate = {
    FirstName : '',
    LastName : ' ',
    email : '',
    authenticating: false,
    authenticated: false,
    error: null
}
export default (state = initstate,action) => {
    console.log(action)
    switch(action.type){
        case `${authConstants.USER_LOGIN}_REQUEST`:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case  `${authConstants.USER_LOGIN}_SUCCESS`:
            state={
                ...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false
            }
            break
        case `${authConstants.USER_LOGIN}_FAILURE`:
            state={
                ...state,
                error: action.payload.error,
                authenticated: false,
                authenticating: false
            }
            break
        case `${authConstants.USER_LOGOUT}_REQUEST`:
            break;
        case `${authConstants.USER_LOGOUT}_SUCCESS`:
            state={
                ...initstate
            }
             break;
        case `${authConstants.USER_LOGOUT}_FAILURE`:
               state={
                   ...state,
                   error: action.payload.error

               }
                break;
    }
    return state
}