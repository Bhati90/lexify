import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Paper,
    Link
} from "@mui/material";
import { useDispatch } from "react-redux";
import { register } from "@/services/auth";
import { AppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, _] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { userName, email, password, confirmPassword } = formData;

        if (!userName || !email || !password || !confirmPassword) {
            setError("Please fill out all fields");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        dispatch(register(formData));

        setFormData({
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
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
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
                <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
                    Create an Account
                </Typography>

                <Typography variant="body2" textAlign="center" color="text.secondary" mb={2}>
                    Sign up to get started
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
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
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
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.02)",
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                </form>

                <Box mt={3} textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Already registered?{" "}
                        <Link
                            component="button"
                            onClick={() => navigate("/login")}
                            underline="hover"
                            sx={{ color: '#1976d2', cursor: 'pointer' }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default RegisterForm;
