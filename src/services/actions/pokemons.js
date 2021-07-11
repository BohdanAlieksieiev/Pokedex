import * as pokemons from "../Pokemons";

export function setFavorite(name) {
    return {
        type: 'SET_FAVORITE',
        favorite: name,
    };
}

export function setCountPokemon(count) {
    return {
        type: 'SET_COUNT_POKEMON',
        count: count,
    };
}

export function removeFavorite() {
    return {
        type: 'REMOVE_FAVORITE',
        favorite: null,
    };
}

export function addToHistory(pokemon) {
    return {
        type: 'ADD_POKEMON_TO_HISTORY',
        pokemon: pokemon,
    };
}

export function setFavoritePokemon(name) {
    return async (dispatch) => {
        dispatch(setFavorite(name))
        return true
    }
}

export function removeFavoritePokemon() {
    return async (dispatch) => {
        dispatch(removeFavorite())
        return true
    }
}

export function setCountPokemonInStore(count) {
    return async (dispatch) => {
        dispatch(setCountPokemon(count))
        return true
    }
}


export function addPokemonToHistory(pokemon) {
    return async (dispatch) => {
        dispatch(addToHistory(pokemon))
        return true
    }
}



export function getPokemons(pagination) {
    return async () => {
        const data = {
            limit: pagination.limit,
            offset: pagination.page
        }
        let res = await pokemons.getPokemons(data).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getPokemonById(id) {
    return async () => {
        let res = await pokemons.getPokemonById(id).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getPokemonByName(name) {
    return async () => {
        let res = await pokemons.getPokemonByName(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getLocationsArea(id) {
    return async () => {
        let res = await pokemons.getLocationsArea(id).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getForm(name) {
    return async () => {
        let res = await pokemons.getForm(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getMove(name) {
    return async () => {
        let res = await pokemons.getMove(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getHeldItem(name) {
    return async () => {
        let res = await pokemons.getHeldItem(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getType(name) {
    return async () => {
        let res = await pokemons.getType(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getLocation(name) {
    return async () => {
        let res = await pokemons.getLocation(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getAbilitie(name) {
    return async () => {
        let res = await pokemons.getAbilitie(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getAllPokemons() {
    return async () => {
        let res = await pokemons.getAllPokemons().then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getPokemon(name) {
    return async () => {
        let res = await pokemons.getPokemon(name).then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getTypes() {
    return async () => {
        let res = await pokemons.getTypes().then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}

export function getRegions() {
    return async () => {
        let res = await pokemons.getRegions().then(res => {
            return res
        }).catch(err => {
            return err
        })
        return res
    }
}