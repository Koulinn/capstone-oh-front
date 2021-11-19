import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 360,
    bgcolor: "background.paper",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: 24,
    p: 4,
    outline: 'none'
};

export default function WelcomeModal({ open, handleClose }) {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h5"
                            className="text-center"
                            component="h2"
                        >
                            Welcome to OneHealth
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                            variant="h6"
                        >
                            To check all functionalities you need to register with a real e-mail
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            Alternatively, the login is already filled with a
                            demonstration user.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
