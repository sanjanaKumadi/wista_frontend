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

async function getDetails(qrcode) {
    const options = {
        method: 'GET',
        url: '/get-user',
        params: { qrcode } 
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

async function sendEmail(data) {
    const options = {
        method: 'POST',
        url: '/send-email',
        data
    };
    const res = await callAPI(options, false);
    return res;
}

const RegistrationServices = {
    insertUser,
    getDetails,
    getAllUsers,
    sendEmail
};

export default RegistrationServices;
