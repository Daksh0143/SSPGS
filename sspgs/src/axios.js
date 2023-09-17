import axios from "axios";

const instance = axios.create({
    baseURL:"http://localhost:2909/",// Replace with your API's base URL
    // headers: {
    //   'Authorization': 'Bearer your-token', // Include any default headers here
    //   'Content-Type': 'application/json',
    // },
});

export default instance;