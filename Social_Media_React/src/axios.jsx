import React from "react";
import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,
});
 