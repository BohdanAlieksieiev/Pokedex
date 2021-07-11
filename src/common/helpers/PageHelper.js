import { getPokemonByType } from "../../services/Pokemons"

export const getItemInPage = (pokemons, size, offset) => { // For page
    return pokemons.slice(parseInt(offset), parseInt(size) + parseInt(offset))
}

export const filterByName = (pokemons, name) => { /// For all
    return pokemons.filter(pokemon => pokemon.name.includes(name.toLowerCase()))
}

export const filterByFewTags = async (staticAllPokemons, tags) => {
    /// Тута починається yobka
    let namePokemon = []
    let urlPokemon = []
    for(let index = 0; index < tags.length; index++) {
        const tagsUrlArr = tags[index].split('/')
        const resTypePokemons = await getPokemonByType(tagsUrlArr[tagsUrlArr.length - 2])
        resTypePokemons.pokemon.forEach(( item ) => {
            namePokemon.push(item.pokemon.name)
            urlPokemon.push(item.pokemon.url)
        })
    }
    const clearNamePokemon = [...new Set(namePokemon)]
    const clearUrlPokemon = [...new Set(urlPokemon)]
    const result = clearNamePokemon.map(( element, index ) => {
        return {
            name: element,
            url: clearUrlPokemon[index]
        }
    })

    return result
}