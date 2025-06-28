import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Paper,
    Link,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { login } from "@/services/auth";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, _] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.userName || !formData.password) {
            setError("Please fill out all fields");
            return;
        }

        dispatch(login(formData));
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f3f4f6"
            px={2}
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
                <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
                    Login to Your Account
                </Typography>

                <Typography variant="body2" textAlign="center" color="text.secondary" mb={2}>
                    Enter your credentials to continue
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="userName"
                        fullWidth
                        margin="normal"
                        value={formData.userName}
                        onChange={handleInputChange}
                        autoComplete="username"
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 3,
                            borderRadius: "999px",
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        Login
                    </Button>
                </form>

                <Box mt={3} textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Not registered?{" "}
                        <Link component="button"
                            onClick={() => navigate("/register")}
                            underline="hover"
                            sx={{ color: '#1976d2', cursor: 'pointer' }}>
                            Create an account
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginForm;
