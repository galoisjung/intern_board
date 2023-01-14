const BASE_URL = 'http://localhost:5000';
export const API = {
    LOGIN: `${BASE_URL}/api/login`,
    LOGOUT: `$${BASE_URL}/api/logout`,
    REGISTER: `${BASE_URL}/api/register`,
}
export const BOARD = {
    GETLIST: `${BASE_URL}/board/list`,
    WRITE: `${BASE_URL}/board/write`,
    UPDATE: `${BASE_URL}/board/update`,
    DELETE: `${BASE_URL}/board/delete`,
    ARTICLES: `${BASE_URL}/board/article`
}

export const COMMENT = {
    REPLAYLIST: `${BASE_URL}/comment`,
    DELETE: `${BASE_URL}/comment/delete`,
    CREATE: `${BASE_URL}/comment/create`
};