import axios from "axios"

const client = axios.create({baseURL:"http://localhost:4000"})

const request = ({...options}) => {

   client.defaults.headers.common.Authorization = 'Basic '+btoa('f9ec7093df3a7b346b7bcf7864069ca3::05138')

   return client(options).then((response)=>response).catch(error => error)
}

export default request