import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode.react';

// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// projects import
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import CreateRegistration from './CreateRegistration';
import CustomEmptyMessage from 'ui-component/CustomEmptyMessage';
import CustomTable from 'ui-component/CustomTable';
import CustomModal from 'ui-component/CustomModal';
import ViewUsers from './ViewUsers';
import RegistrationServices from 'services/registrationServices';

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
                const tempRows = rowData.map((row) => ({
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

    const handleCloseModal = () => {
        setOpenCreateUser(false);
        setOpenViewUser(false);
    };

    const downloadQRCode = (id, name, email) => {
        const canvas = document.getElementById(`qrcode-${id}`);
        canvas.toBlob((blob) => {
            saveAs(blob, `${name}-${id}.png`);
        });
    };

    const sendEmail = async (id, name, email) => {
        try {
            const response = await RegistrationServices.sendEmail({
                id,
                name,
                email
            });

            if (response.status === 200) {
                alert('Email sent successfully');
            } else {
                alert('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email');
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', headerAlign: 'center', align: 'center', flex: 1 },
        {
            field: 'qrCode',
            headerName: 'Generate QR',
            headerAlign: 'center',
            align: 'center',
            disableExport: true,
            flex: 1,
            renderCell: (params) => (
                <>
                    <QRCode
                        id={`qrcode-${params.row.id}`}
                        value={`${params.row.id},${params.row.name},${params.row.email}`}
                        size={128}
                        level="H"
                        includeMargin={true}
                        style={{ display: 'none' }}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => downloadQRCode(params.row.id, params.row.name, params.row.email)}
                    >
                        Download
                    </Button>
                </>
            )
        },
        {
            field: 'sendEmail',
            headerName: 'Send Email',
            headerAlign: 'center',
            align: 'center',
            disableExport: true,
            flex: 1,
            renderCell: (params) => (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => sendEmail(params.row.id, params.row.name, params.row.email)}
                >
                    Send
                </Button>
            )
        }
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
