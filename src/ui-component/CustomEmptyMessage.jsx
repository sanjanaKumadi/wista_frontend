import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// assets
import NoDataImg from 'assets/images/no-data.jpg';

// project imports
import MainCard from './cards/MainCard';

const CustomEmptyMessage = ({ hideImage, textFontSize, text, btnName, path, mb, handleOnClick }) => (
    <MainCard>
        <Grid container spacing={3} display="flex" alignItems="center" flexDirection="column" mb={mb || 8}>
            {!hideImage && (
                <Grid item xs={12}>
                    <img src={NoDataImg} alt="" width={600} />
                </Grid>
            )}
            <Grid item xs={12}>
                <Typography variant="subtitle1" fontSize={textFontSize || 20}>
                    {text}
                </Typography>
            </Grid>
            {btnName && (
                <Grid item xs={12}>
                    <Button disableElevation component={path ? Link : ''} to={path} variant="contained" onClick={handleOnClick}>
                        {btnName}
                    </Button>
                </Grid>
            )}
        </Grid>
    </MainCard>
);

CustomEmptyMessage.propTypes = {
    hideImage: PropTypes.bool,
    textFontSize: PropTypes.number,
    text: PropTypes.string,
    btnName: PropTypes.string,
    path: PropTypes.string,
    mb: PropTypes.number,
    handleOnClick: PropTypes.func
};

export default CustomEmptyMessage;
