
export const baseURL = 'http://localhost:1337/api/';

export const baseURLImg = 'http://localhost:1337'

export const config = {
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

export const d = {
    mode: 'no-cors',
    headers: {
        Authorization: "Bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
};

export const params = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}