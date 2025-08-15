"use client";

import axios, { AxiosRequestConfig, Method } from "axios";
import { BASE_URL } from "./config";

const ApiUrl = BASE_URL;

interface ApiResponse<T = any> {
    data: T;
    message?: string;
    [key: string]: any;
}

const ApiService = async <T = any>(
    method: Method,
    endpoint: string,
    data: Record<string, any> = {},
    token?: any
): Promise<ApiResponse<T>> => {
    try {

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const config: AxiosRequestConfig = {
            method,
            url: `${ApiUrl}${endpoint}`,
            withCredentials: true,
            data,
            headers: {
                ...headers,
            },
        };

        const response = await axios<ApiResponse<T>>(config);
        return response.data;
    } catch (error: any) {
        const errorResponse = error.response?.data ?? { message: "An error occurred", error };
        throw errorResponse;
    }
};


export default ApiService;