import userApi from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
    "user/login",
    async (
        { userName, password }: { userName: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await userApi.post("/auth/login", { username_or_email :userName, password });
            const { access_token, user_id, username, refresh_token } = response.data;
            console.log("response.data", response.data);

            if (access_token && user_id && refresh_token) {
                localStorage.setItem("accessToken", access_token);
                localStorage.setItem("refresh_token", refresh_token);
                window.location.replace("https://localhost:5173/search");
                toast.success("Login Successfully");
                return { access_token, user_id, username }
            }
            else
                return rejectWithValue("Login Failed: No access token recieved.");
        }
        catch (err: any) {
            if (err.response) {
                if (err.status === 403) {
                    console.log("All fields are required.");
                    toast.info("All fields are required.")
                }
                else if (err.status === 402) {
                    console.log("Password incorrect.");
                    toast.error("Username or password id incorrect");
                }
                else if (err.status === 401) {
                    console.log("User not registered!");
                    toast.info("User not registerd, please Signup.")
                    window.location.href = "/";
                }
                else {
                    console.log("Error occurred:", err)
                    toast.error("Network error, try again");
                }
            }
            else {
                console.log("Network error or unknown error", err.message);
                toast.error("Network error, try again");
            }
            return rejectWithValue(
                err.response?.data?.message ||
                "Login failed: Invalid credentials or server error."
            )
        }
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (
        {
            userName,
            email,
            password,
        }: {
            userName: string;
            email: string;
            password: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await userApi.post("/auth/register", {
                username: userName,
                email,
                password,
            });

            if (response.status === 201) {
                localStorage.setItem("accessToken ", response.data?.accessToken);
                toast.success("Registered successfully, Login now");
                window.location.replace("https://ai-agent-frontend-phi.vercel.app/login");
                return response.data?.accessToken ?? null;
            } else {
                return rejectWithValue(
                    "Registration failed: No access token received."
                );
            }
        } catch (error: any) {
            if (error.response) {
                const status = error.status;
                const message = error.response.data.message;

                if (status === 409) {
                    console.log(status, ":User Already exists");
                    toast.info("User Already exists")
                } else if (status === 403) {
                    console.log("All fields are required");
                    toast.info("All fields are required")
                } else {
                    console.log("Error occurred:", message || "Something went wrong");
                    toast.error("Network error")
                }
            }
            return rejectWithValue(
                error.response?.data?.message || "Registration failed: Server error."
            );
        }
    }
);

export const forgetPassword = createAsyncThunk(
    "user/forgetPassword",
    async ({ email }: { email: string }, { rejectWithValue }) => {
        try {
            const response = await userApi.put("/auth/forgetPassword", {
                email,
            });

            if (response.data.sucess === true) {
                console.log("reset link share on registered mailID");
                return 1;
            } else {
                return rejectWithValue(
                    "Registration failed: No access token received."
                );
            }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed: Server error."
            );
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (
        {
            password,
            confirmPassword,
            token,
        }: { password: string; confirmPassword: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await userApi.put("/auth/resetPassword", {
                password,
                confirmPassword,
                token,
            });

            console.log("reset Password res", response);
            if (response.status === 201) {
                toast.success("Registered succefully, Login now")
                return 1;
            } else {
                return rejectWithValue("Password not updated.");
            }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Password updation failed: Server error."
            );
        }
    }
);

export const getUserDetails = createAsyncThunk(
    "user/userDetail",
    async (_,
        { rejectWithValue }
    ) => {
        try {
            const response = await userApi.get("/user/userDetail");
            console.log("res:", response);
            if (response.status === 200) {
                // console.log("response.data.user", response.data.user)
                return response?.data?.user;
            } 
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Password updation failed: Server error."
            );
        }
    }
)