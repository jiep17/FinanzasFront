import axios from "axios"

export default axios.create({
    baseURL: 'https://creditotienda20201123235433.azurewebsites.net/api',
    headers: {
        'Content-type': 'application/json'
    }
})
