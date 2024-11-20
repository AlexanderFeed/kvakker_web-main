import api from '@/api';

// Функция для выполнения запросов с использованием fetch
export const fetchWithInterceptors = async (url, options) => {
    const accessToken = getAccessToken();
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    try {
        const response = await fetch(url, options);

        // Обработка ошибок
        if (!response.ok) {
            const status = response.status;

            // Проверка статуса ошибки авторизации
            if (status === 401) {
                // Обработка ошибки авторизации, например, перенаправление на страницу входа
                await handleAuthorizationError();
                return this.fetchWithInterceptors(url, options);
            }
        }

        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

// Функция для получения токена доступа (замените на свою логику)
function getAccessToken() {
    return localStorage.getItem('accesstoken');
}

// Функция для обработки ошибки авторизации (замените на свою логику)
async function handleAuthorizationError() {
    const refreshToken = localStorage.getItem('refreshtoken');
    const options = {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + refreshToken },
    };
    try {
        const response = await fetch(api.refreshAuth, options);
        const data = await response.json();
        if (response.ok) {
            // Обновление токенов в localStorage
            localStorage.clear();
            localStorage.setItem('accesstoken', data.access_token);
            localStorage.setItem('refreshtoken', data.refresh_token);
        }
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);

        localStorage.clear();
        this.$router.push('/login');
    }
}
