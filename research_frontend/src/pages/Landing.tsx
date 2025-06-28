import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
} from "@mui/material";

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #ffffff, #f9fafb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Grid Pattern */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: "-150px",
                    right: "-150px",
                    width: "400px",
                    height: "400px",
                    background: "radial-gradient(circle at center, #06b6d4 0%, transparent 70%)",
                    filter: "blur(100px)",
                    zIndex: -1,
                }}
            />

            <Container maxWidth="lg" sx={{ textAlign: "center", py: 10 }}>
                {/* Hero Section */}
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        background: "linear-gradient(to right, #111827, #1f2937)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 3,
                    }}
                >
                    Lexify: Your AI Research Assistant
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    maxWidth="sm"
                    mx="auto"
                >
                    Meet your new AI chat companion that goes beyond conversation — it can actually get things done!
                </Typography>

                <Typography
                    variant="caption"
                    color="text.disabled"
                    display="block"
                    mt={1}
                >
                    Powered by IBM's WxTools & your favourite LLMs.
                </Typography>

                {/* Buttons */}
                <Box mt={5} display="flex" justifyContent="center" gap={2}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/login")}
                        sx={{
                            backgroundColor: "#000",
                            color: "#fff",
                            px: 5,
                            borderRadius: "999px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#1a1a1a",
                                transform: "scale(1.05)",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/register")}
                        sx={{
                            borderColor: "#000",
                            color: "#000",
                            px: 5,
                            borderRadius: "999px",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                                borderColor: "#000",
                                transform: "scale(1.05)",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#f2f2f2",
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={4} mt={8} justifyContent="center">
                    {[
                        { title: "Fast", description: "Real-time streamed responses" },
                        {
                            title: "Modern",
                            description: "Next.js 15, Tailwind CSS, Convex, Clerk",
                        },
                        { title: "Smart", description: "Powered by Your Favourite LLMs" },
                    ].map((feature) => (
                        <Grid item xs={12} sm={6} md={4} key={feature.title}>
                            <Typography variant="h6" fontWeight="medium" gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {feature.description}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Landing;
