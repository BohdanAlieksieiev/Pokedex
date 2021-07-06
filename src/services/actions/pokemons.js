import * as pokemons from "../Pokemons";

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