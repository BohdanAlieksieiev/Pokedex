import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const HISTORY_LENGTH = 10
const initialState = {
    favorite: localStorage.getItem('favorite'),
    count: localStorage.getItem('count'),
    historyPokemon: JSON.parse(localStorage.getItem("historyPokemon")),
};

function reducer(state = initialState, action) {
    switch (action.type){
        case 'SET_FAVORITE':
            localStorage.setItem('favorite', action.favorite);
            state = {
                ...state,
                favorite: action.favorite
            }
            break;
        case 'REMOVE_FAVORITE':
            localStorage.removeItem('favorite');
            state = {
                ...state,
                favorite: null
            }
            break;
        case 'SET_COUNT_POKEMON':
            localStorage.setItem('count', action.count);
            state = {
                ...state,
                count: action.count
            }
            break;
        case 'ADD_POKEMON_TO_HISTORY':
            const newPokemon = action.pokemon
            const allHistoryPokemon = JSON.parse(localStorage.getItem("historyPokemon"));

            if(allHistoryPokemon) {
                if(!allHistoryPokemon.includes(newPokemon)){ /// перевіряє чи пакемон є у історії
                    if(allHistoryPokemon.length < HISTORY_LENGTH) { // перевіряєм кількість пакемонив у історії
                        // Якщо менша то потрібно просто додати пакемона
                        let pokemonNow = allHistoryPokemon
                        pokemonNow.push(newPokemon)
                        localStorage.setItem("historyPokemon", JSON.stringify(pokemonNow));
                        state = {
                            ...state,
                            historyPokemon: pokemonNow
                        }
                    }else{ // у іншому випадку останнього пакемона потрібно видалити
                        let newArrHistory = []
                        for(let index = 1; index < HISTORY_LENGTH; index++){
                            newArrHistory.push(allHistoryPokemon[index])
                        }
                        newArrHistory.push(newPokemon)
                        localStorage.setItem("historyPokemon", JSON.stringify(newArrHistory));
                        state = {
                            ...state,
                            historyPokemon: newArrHistory
                        }
                    }
                }
            }else{ /// null
                let newArrHistory = [newPokemon]
                localStorage.setItem("historyPokemon", JSON.stringify(newArrHistory));
            }
            break;
        default:
            return state
    }

    return state;
}

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);

