import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
}
const FormDialogtxs: React.FC<FormDialogProps> = ({
  open,
  onClose,
  onSave,
  title,
  children,
}) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="form-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button autoFocus onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default FormDialogtxs;
