import axios from "axios";

export const API_URL = "https://reach-inbox-assignment-syvt.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export async function getMe() {
    try {
        const res = await api.get("/auth/me");
        return res.data;
    } catch (err) {
        return null;
    }
}

export async function getScheduledEmails() {
    const res = await api.get("/api/emails/scheduled");
    return res.data;
}

export async function getSentEmails() {
    const res = await api.get("/api/emails/sent");
    return res.data;
}
