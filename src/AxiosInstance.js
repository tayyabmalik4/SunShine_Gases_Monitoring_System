import axios from "axios";

let SERVER = window.location.origin
const Instance = axios.create({
    // baseURL: `http://localhost:4040/api`
    baseURL: `${SERVER}/api`
})

export default Instance