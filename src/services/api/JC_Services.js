import { BASE_URL } from '../endpoints.config';
import { store } from '../../stores/configureStore';  // Adjust path to your Redux store

export default async function JC_Services(services, link, method, form, token) {
    const makeRequest = async (accessToken) => {
        let headers = {};
        let body;
        const url = BASE_URL[services] + link;

        if (form instanceof FormData) {
            headers = {
                Accept: 'application/json',
            };
            body = form;
        } else {
            headers = {
                'Accept': 'application/json',
                'Content-type': 'application/json;charset=UTF-8',
            };
            body = JSON.stringify(form);
        }

        if (accessToken) {
            headers = { ...headers, Authorization: `Bearer ${accessToken}` };
        }

        const requestConfig = {
            method: method,
            headers: headers,
        };

        if (method !== 'GET' && method !== 'HEAD') {
            requestConfig.body = body;
        }

        const request = new Request(url, requestConfig);

        const resp = await fetch(request);
        const data = await resp.json();
        return ApiResponse(resp.status, data);
    };

    try {
        const response = await makeRequest(token);

        // If the response indicates token expired
        if (response.status === 401 && store.getState().refreshToken) {
            try {
                // Get current state
                const state = store.getState();

                // Try to refresh the token
                const refreshResponse = await JC_Services(
                    "JAPPCARE",
                    'auth/refresh-token',
                    'POST',
                    { refreshToken: state.refreshToken }
                );

                if (refreshResponse.status === 200) {
                    // Update store with new tokens
                    store.dispatch({
                        type: "LOGIN",
                        users: {
                            ...state,
                            accessToken: refreshResponse.body.accessToken,
                            refreshToken: refreshResponse.body.refreshToken,
                            accessTokenExpiry: Number(refreshResponse.body.accessTokenExpiry),
                            refreshTokenExpiry: Number(refreshResponse.body.refreshTokenExpiry)
                        }
                    });

                    // Retry original request with new token
                    return await makeRequest(refreshResponse.body.accessToken);
                }
            } catch (refreshError) {
                store.dispatch({ type: "LOGOUT" });
                throw refreshError;
            }
        }

        return response;
    } catch (error) {
        console.error('Error:', error);
        return ApiResponse(500, { error: 'Internal Server Error' });
    }
}

function ApiResponse(status, data) {
    return {
        status: status,
        body: data,
    };
}