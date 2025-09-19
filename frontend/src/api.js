// src/api.js
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://contact-book-app-rv7x.onrender.com' // your backend base URL
})

export default api

