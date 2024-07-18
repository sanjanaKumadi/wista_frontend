// React and Material-UI imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';

const Verify = () => {
    const [message, setMessage] = useState('');
    const { id } = useParams(); // Assuming you're using React Router for routing

    useEffect(() => {
        // Function to send the ID to the backend API
        const verifyId = async () => {
            try {
                // const response = await axios.post('http://your-backend-api-url/verify', { id });
                const response = {data:{message:"successful"}}
                setMessage(response.data.message); // Assuming backend sends a message
            } catch (error) {
                setMessage('Error verifying ID'); // Handle error cases
            }
        };

        verifyId();
    }, [id]); // Dependency array to run effect when `id` changes

    return (
        <MainCard>
            <Typography variant="body2">
                {message ? message : 'Verifying...'}
            </Typography>
        </MainCard>
    );
};

export default Verify;
