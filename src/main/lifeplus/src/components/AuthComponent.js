import React, {useState, useEffect} from 'react';
import axios from "axios";

const AuthComponent = ({signupForm}) => {
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [tokenExpiresIn, setTokenExpiresIn] = useState(null);
    const [refreshTokenExpiresIn, setRefreshTokenExpiresIn] = useState(null);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedTokenExpiresIn = localStorage.getItem('tokenExpiresIn');
        const storedRefreshTokenExpiresIn = localStorage.getItem('refreshTokenExpiresIn');

        if (storedAccessToken) setAccessToken(storedAccessToken);
        if (storedRefreshToken) setRefreshToken(storedRefreshToken);
        if (storedTokenExpiresIn) setTokenExpiresIn(Number(storedTokenExpiresIn));
        if (storedRefreshTokenExpiresIn) setRefreshTokenExpiresIn(Number(storedRefreshTokenExpiresIn));
    }, []);

    const refreshTokens = async () => {
        try {
            const response = await axios.post("/login", signupForm, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;

            // TODO: Refresh token logic

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('tokenExpiresIn', String(Date.now() + 3600000));
        } catch (error) {
            console.error("Login request failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiresIn');
        localStorage.removeItem('refreshTokenExpiresIn');
        setAccessToken('');
        setRefreshToken('');
        setTokenExpiresIn(null);
        setRefreshTokenExpiresIn(null);
    };

    return {accessToken, refreshToken, tokenExpiresIn, refreshTokenExpiresIn, refreshTokens, logout};
};

export default AuthComponent;

