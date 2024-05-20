import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
   return axios.get(baseUrl) 
}

const create = (newContact) => {
   return axios.post(baseUrl, newContact) 
}

const update = (id, updatedContact) => {
    return axios.put(`${baseUrl}/${id}`, updatedContact)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    deleteContact
}
