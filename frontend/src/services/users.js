import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async credentials => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, credentials, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update }