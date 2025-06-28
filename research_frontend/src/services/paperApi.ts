// src/services/papersApi.ts
import api from "../api/api"
import {
    PaperSearchQuery,
    PaperSearchResponse,
    PaperStatusResponse,
    ApiError,
} from "../utils/types/apiTypes";

export const searchPapers = async (
    query: string
): Promise<PaperSearchResponse> => {
    try {
        const access_token = localStorage.getItem('accessToken')
        const response = await api.post("/papers/search", {
            query,
        } as PaperSearchQuery,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });

        console.log("response", response)
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw error as ApiError;
    }
};

export const getPaperStatus = async (
    paperDbId: number
): Promise<PaperStatusResponse> => {
    try {
        const access_token = localStorage.getItem('accessToken')
        const response = await api.get(`/papers/${paperDbId}/status`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
        return response.data;
    } catch (error) {
        throw error as ApiError;
    }
};

export const triggerPaperProcessing = async (
    paperDbId: number
): Promise<{ msg: string }> => {
    try {
        const access_token = localStorage.getItem('accessToken')
        const response = await api.post(`/papers/${paperDbId}/process-manual`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
        return response.data;
    } catch (error) {
        throw error as ApiError;
    }
};
