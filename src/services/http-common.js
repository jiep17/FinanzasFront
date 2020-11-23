import axios from "axios"

export default axios.create({
    baseURL: 'https://meetyourroommateapi.azurewebsites.net/api',
    headers: {
        'Content-type': 'application/json'
    }
})
