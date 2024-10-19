import axios from 'axios';

export const registerUser = async (user) => {
    const response = await axios.post('http://localhost:5000/register', user);
    return response.data;
}

export const getAllProducts = async () => {
    const response = await axios.get('http://localhost:5000/getProducts',
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
          }
        });
    return response.data;
}

export const getBySearch = async (key) => {
    const response = await axios.get(`http://localhost:5000/search/${key}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
          }
        });
    return response.data;
}