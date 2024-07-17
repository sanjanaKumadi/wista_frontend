import PropTypes from 'prop-types';

// material-ui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import PerfectScrollbar from 'react-perfect-scrollbar';

const CustomModal = ({ open, handleCloseDialog, title, content, maxWidth, rows, showCloseIcon }) => (
    <Dialog
        open={open}
        sx={{
            '&>div:nth-of-type(3)': {
                '&>div': {
                    maxWidth: maxWidth || 1000
                }
            }
        }}
        fullWidth
    >
        <DialogTitle
            display="flex"
            justifyContent={title ? (showCloseIcon ? 'space-between' : 'center') : 'flex-end'}
            alignItems="center"
            sx={{ mb: '1px' }}
        >
            {title}
            {showCloseIcon && (
                <IconButton aria-label="close" color="secondary" onClick={handleCloseDialog} disabled={rows && rows.length > 0}>
                    <CloseIcon />
                </IconButton>
            )}
        </DialogTitle>
        <PerfectScrollbar>
            <DialogContent>{content}</DialogContent>
        </PerfectScrollbar>
    </Dialog>
);

CustomModal.defaultProps = {
    showCloseIcon: true
};

CustomModal.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.element,
    maxWidth: PropTypes.number,
    rows: PropTypes.array,
    showCloseIcon: PropTypes.bool
};

export default CustomModal;
