import API from '../api/api'

export const getPokemons = async (data) => {
    const request = await API.get('/pokemon?limit=' + data.limit + '&offset=' + data.offset, null)
    return request.data
}

export const getPokemonById = async (id) => {
    const request = await API.get('/pokemon/' + id, null)
    return request.data
}

export const getPokemonByName = async (name) => {
    const request = await API.get('/pokemon/' + name, null)
    return request.data
}

export const getAllPokemons = async () => {
    const request = await API.get('/pokemon?limit=5000&offset=0', null)
    return request.data
}

export const getPokemon = async (name) => {
    const request = await API.get('/pokemon/' + name)
    return request.data
}

export const getTypes = async () => {
    const request = await API.get('/type')
    return request.data
}

export const getRegions = async () => {
    const request = await API.get('/region')
    return request.data
}

export const getPokemonByType = async (idType) => {
    const request = await API.get('/type/' + idType)
    return request.data
}

export const getLocationsArea = async (id) => {
    const request = await API.get('/pokemon/' + id + '/encounters')
    return request.data
}

export const getAbilitie = async (name) => {
    const request = await API.get('/ability/' + name)
    return request.data
}

export const getForm = async (name) => {
    const request = await API.get('/pokemon-form/' + name)
    return request.data
}

export const getMove = async (name) => {
    const request = await API.get('/move/' + name)
    return request.data
}

export const getHeldItem = async (name) => {
    const request = await API.get('/item/' + name)
    return request.data
}

export const getType = async (name) => {
    const request = await API.get('/type/' + name)
    return request.data
}

export const getLocation = async (name) => {
    const request = await API.get('/location-area/' + name)
    return request.data
}
