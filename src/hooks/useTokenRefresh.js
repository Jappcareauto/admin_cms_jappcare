import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JC_Services from '../services/JC_Services';  // Adjust path as needed

export const useTokenRefresh = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state);

    const refreshTokens = async (refreshToken) => {
        try {
            const response = await JC_Services(
                "JAPPCARE",
                'auth/refresh-token',
                'POST',
                { refreshToken }
            );

            if (response && response.status === 200) {
                return response.body;
            }
            throw new Error('Failed to refresh token');
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    };

    const refreshAuthTokens = async () => {
        try {
            const newTokens = await refreshTokens(user.refreshToken);
            dispatch({
                type: "LOGIN",
                users: {
                    ...user,
                    accessToken: newTokens.accessToken,
                    refreshToken: newTokens.refreshToken,
                    accessTokenExpiry: Number(newTokens.accessTokenExpiry),
                    refreshTokenExpiry: Number(newTokens.refreshTokenExpiry)
                }
            });
            return newTokens.accessToken;
        } catch (error) {
            dispatch({ type: "LOGOUT" });
            throw error;
        }
    };

    useEffect(() => {
        if (!user.accessToken || !user.accessTokenExpiry) return;

        // Convert to number if it's not already
        const expiryTime = Number(user.accessTokenExpiry);
        const currentTime = Number(Date.now());

        const timeUntilExpiry = expiryTime - currentTime;
        const refreshTime = Math.max(0, timeUntilExpiry - (5 * 60 * 1000)); // Refresh 5 minutes before expiry

        const refreshTimer = setTimeout(() => {
            refreshAuthTokens();
        }, refreshTime);

        return () => clearTimeout(refreshTimer);
    }, [user.accessToken, user.accessTokenExpiry]);

    return { refreshAuthTokens };
};