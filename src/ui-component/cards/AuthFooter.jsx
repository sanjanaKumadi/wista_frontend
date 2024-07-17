// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://wistainternational.com/association/wista-sri-lanka/" target="_blank" underline="hover">
            Wista - Sri Lanka
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://www.ifsolutions.lk/" target="_blank" underline="hover">
            &copy; developped by IF Solutions
        </Typography>
    </Stack>
);

export default AuthFooter;
