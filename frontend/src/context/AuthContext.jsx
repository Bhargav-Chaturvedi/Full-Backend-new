import { createContext, useState, useEffect, useContext } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in (has token)
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const res = await axiosClient.get('/users/current');
                    setUser(res.data);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('accessToken');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        const res = await axiosClient.post('/users/login', { email, password });
        const token = res.data; // The backend returns the token string directly or object? Token is usually a string or inside an object.

        // Backend: res.status(200).json(accessToken); -> It is a string directly based on controller analysis

        if (token) {
            localStorage.setItem('accessToken', token);
            // Fetch user details immediately
            const userRes = await axiosClient.get('/users/current');
            setUser(userRes.data);
            return true;
        }
        return false;
    };

    const register = async (username, email, phone, password) => {
        await axiosClient.post('/users/register', { username, email, phone, password });
        return true; // Return success, let user login manually or auto-login
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
