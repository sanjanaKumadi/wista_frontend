import axios from 'axios';
import { API_END } from '../config';

const axiosInstance = axios.create({
    baseURL: API_END,
    withCredentials: false
});

const callAPI = async (options, auth = false) => {
    try {
        let axiosOptions = {
            ...options
        };
        if (auth) {
            // const TOKEN = storeInstance.getState().auth.session.access_token ? storeInstance.getState().auth.session.access_token : null;
            axiosOptions = {
                ...axiosOptions,
                headers: {
                    // Authorization: `Bearer ${TOKEN}`,
                    // Added by Prasanna, this should be recrified after the JWT implementing
                    // Authorization: `Bearer ${window.localStorage.getItem('serviceToken')}`,
                    'Content-Type': 'application/json'
                }
            };
        }

        const { data } = await axiosInstance(axiosOptions);
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message ? error.response.data.message : error.response.data.error);
        } else if (error.request) {
            throw new Error(`Could not connect to server`);
        } else {
            // Something happened - triggered an Error
            throw new Error(error);
        }
    }
};

// eslint-disable-next-line import/prefer-default-export
export { callAPI };
