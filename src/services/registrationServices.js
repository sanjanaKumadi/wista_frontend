import { callAPI } from 'services/axios';

async function insertUser(data) {
    const options = {
        method: 'POST',
        url: '/insert-user',
        data
    };
    const res = await callAPI(options, false);
    return res;
}

async function getDetails() {
    const options = {
        method: 'GET',
        url: '/get-user'
    };
    const res = await callAPI(options, false);
    return res;
}

async function getAllUsers() {
    const options = {
        method: 'GET',
        url: '/get-all-users'
    };
    const res = await callAPI(options, false);
    return res;
}

const RegistrationServices = {
    insertUser,
    getDetails,
    getAllUsers
};

export default RegistrationServices;
