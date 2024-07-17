import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Service functions
import RegistrationServices from 'services/registrationServices';

const ViewUsers = ({ handleClose, chapter }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await RegistrationServices.getDetails();

            if (res?.data.length !== 0) {
                const rowData = res?.data;
                const tempRows = rowData.map((row, index) => ({
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    phone: row.phone
                }));
                setRows(tempRows);
            }

            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} mt={1}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    value={chapter ? chapter.chapterTitle : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    multiline
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={chapter ? chapter.chapterDescription : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    value={chapter ? chapter.phone : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="primary" variant="outlined" onClick={handleClose} sx={{ marginRight: 2 }}>
                        Close
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

ViewUsers.propTypes = {
    handleClose: PropTypes.func.isRequired,
    chapter: PropTypes.object
};

export default ViewUsers;
