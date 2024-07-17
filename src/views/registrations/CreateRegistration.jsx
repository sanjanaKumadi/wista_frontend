import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar'; // Adjust the import according to your project structure

// Service functions
import RegistrationServices from 'services/registrationServices';

// Validation schema
const validationSchema = yup.object({
    name: yup.string('Enter the Name').required('Name is required'),
    email: yup.string('Enter the email').required('Email is required'),
    phone: yup.string('Enter the phone number').required('Phone number is required')
});

const CreateRegistration = ({ handleClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await RegistrationServices.insertUser(values);
                // Assuming setNewAccountID and dispatch openSnackbar are defined properly in your context
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                handleClose();
            } catch (error) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: error.message,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} mt={1}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        multiline
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button color="primary" variant="outlined" onClick={handleClose} sx={{ marginRight: 2 }}>
                            Cancel
                        </Button>

                        <Button color="primary" variant="contained" type="submit">
                            Create
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

CreateRegistration.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default CreateRegistration;
