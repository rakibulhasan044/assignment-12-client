import axios from "axios";
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const { logOut } = useAuth()

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        //console.log('int token',token);
        config.headers.authorization = `bearer ${token}`
        //console.log('stopped by axios');
        return config
    }), function(error) {
        console.log('int', error);
        return Promise.reject(error)
    }

    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async (error) => {
        const status = error.response.status
        console.log('status error in the interceptor', status);
        if(status === 401 || status === 403) {
            console.log('int', error);
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;