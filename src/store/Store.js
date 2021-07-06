import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {
    token: localStorage.getItem('token')
};

function reducer(state = initialState, action) {
    switch (action.type){
        case 'SET_TOKEN':
            localStorage.setItem('token', action.payload);
            state = {
                ...state,
                token: action.payload
            }
            break;
        case 'REMOVE_TOKEN':
            localStorage.removeItem('token');
            state = {
                ...state,
                token: null
            }
            break;
        default:
            console.log()
    }

    return state;
}

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);

