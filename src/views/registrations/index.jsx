import { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import { IconEye } from '@tabler/icons-react';

// projects import
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import CreateRegistration from './CreateRegistration';
import CustomEmptyMessage from 'ui-component/CustomEmptyMessage';
import CustomTable from 'ui-component/CustomTable';
import CustomModal from 'ui-component/CustomModal';
import ViewUsers from './ViewUsers';
import RegistrationServices from 'services/registrationServices';
// import ChapterServices from 'services/tutor/chapters/chapterServices';

const Registrations = () => {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openCreateUser, setOpenCreateUser] = useState(false);
    const [openViewUser, setOpenViewUser] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await RegistrationServices.getAllUsers();

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

    const handleOpenCreateUser = () => {
        setOpenCreateUser(true);
    };

    const handleOpenViewUser = () => {
        setOpenViewUser(true);
    };

    const handleCloseModal = () => {
        setOpenCreateUser(false);
        setOpenViewUser(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', headerAlign: 'center', align: 'center', flex: 1 }
    ];

    if (rows.length === 0) {
        return <CustomEmptyMessage text="No Registrations are Created yet !!!" />;
    }

    return (
        <Box>
            <Grid container spacing={gridSpacing} flexDirection="column">
                <Grid item>
                    <MainCard
                        title={
                            <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                                <Grid item>
                                    <Typography variant="h3">All Registrations</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={handleOpenCreateUser}>
                                        Add New Registration
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                    >
                        <CustomTable columns={columns} rows={rows} />
                    </MainCard>
                </Grid>
            </Grid>

            <CustomModal
                open={openCreateUser}
                handleCloseDialog={handleCloseModal}
                title="Add New User"
                content={<CreateRegistration handleClose={handleCloseModal} />}
                maxWidth={600}
                showCloseIcon={false}
            />
            <CustomModal
                open={openViewUser}
                handleCloseDialog={handleCloseModal}
                title="View Details"
                content={<ViewUsers handleClose={handleCloseModal} />}
                maxWidth={600}
                showCloseIcon={false}
            />
        </Box>
    );
};

export default Registrations;
