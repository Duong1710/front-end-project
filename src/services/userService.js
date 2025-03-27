import axios from '../axios';


const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword }); // email và password này là key của thuộc tính nên phải viết đúng là email, password
}

// gọi sang đường link bên BE
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
export { handleLoginApi, getAllUsers }