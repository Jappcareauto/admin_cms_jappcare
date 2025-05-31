import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    styled,
    IconButton,

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Styled components for consistent dialog styling to match the screenshot
const StyledDialog = styled(Dialog)(() => ({
    '& .MuiPaper-root': {
        borderRadius: '12px',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        maxWidth: '450px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Grayish semi-transparent background from screenshot
        backdropFilter: 'blur(5px)',
        margin: '16px'
    },
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(26, 29, 31, 0.5)'
    }
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({
    padding: '16px 24px',
    fontWeight: 600,
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#1A1D1F',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
}));

const StyledDialogContent = styled(DialogContent)(() => ({
    padding: '24px',
}));

const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '15px',
    marginBottom: 0,
}));

const StyledDialogActions = styled(DialogActions)(() => ({
    padding: '16px 24px',
    justifyContent: 'flex-end',
    gap: '12px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
}));

const CancelButton = styled(Button)(({ theme }) => ({
    borderRadius: '28px',
    padding: '8px 20px',
    textTransform: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: theme.palette.text.primary,
    border: 'none',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    }
}));

const DeleteButton = styled(Button)(({ theme }) => ({
    borderRadius: '28px',
    padding: '8px 20px',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    }
}));

// Example of implementation
interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title = "Confirm Deletion",
    message,
    onConfirm,
    onCancel,
    confirmText = 'Delete',
    cancelText = 'Cancel',
}) => {
    return (
        <StyledDialog
            open={open}
            onClose={onCancel}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <StyledDialogTitle id="confirm-dialog-title">
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onCancel}
                    size="small"
                    sx={{
                        color: 'text.primary',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </StyledDialogTitle>
            <StyledDialogContent>
                <StyledDialogContentText id="confirm-dialog-description">
                    {message}
                </StyledDialogContentText>
            </StyledDialogContent>
            <StyledDialogActions>
                <CancelButton onClick={onCancel}>
                    {cancelText}
                </CancelButton>
                <DeleteButton onClick={onConfirm} autoFocus>
                    {confirmText}
                </DeleteButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default ConfirmDialog;