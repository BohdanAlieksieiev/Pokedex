import API from '../api/api'

export const getPokemons = async (data) => {
    const request = await API.get('/pokemon?limit=' + data.limit + '&offset=' + data.offset, null)
    return request.data
}

export const getPokemon = async (name) => {
    const request = await API.get('/pokemon/' + name)
    return request.data
}
