// React and Material-UI imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import RegistrationServices from 'services/registrationServices';
import SubCard from 'ui-component/cards/SubCard';
import Grid from '@mui/material/Grid';

const Verify = () => {
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Function to send the ID to the backend API
        const fetchUserDetails = async () => {
            try {
                const response = await RegistrationServices.getDetails(id);
                const userData = response.data;
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [id]); // Dependency array to run effect when `id` changes

    return (
        <MainCard>
            {userData ? (
                <SubCard>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Name: {userData.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Email: {userData.email}</Typography>
                            <Typography variant="body1">Phone: {userData.phone}</Typography>
                        </Grid>
                    </Grid>
                </SubCard>
            ) : (
                <Typography variant="body2">Loading User...</Typography>
            )}
        </MainCard>
    );
};

export default Verify;
