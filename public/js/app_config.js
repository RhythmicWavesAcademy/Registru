const API_KEY = "AIzaSyAyW28VvX1hcNjPS49woHkUFaj8-cXMRps"

const BASE_API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:"

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "registru-d6b7b.firebaseapp.com",
    projectId: "registru-d6b7b",
    storageBucket: "registru-d6b7b.firebasestorage.app",
    messagingSenderId: "914926288060",
    appId: "1:914926288060:web:5a085a2369b1a7ac7164b9",
    measurementId: "G-QSDZCKE9MR"
};

function toLocalISOString(date) {
    const localDate = new Date(date - date.getTimezoneOffset() * 60000);
    localDate.setSeconds(null);
    localDate.setMilliseconds(null);
    return localDate.toISOString().slice(0, -1);
}

async function makeRequest(url, jsonRequest){
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonRequest),
    });

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }

    return data;
}

async function sendEmailVerification(idToken) {
    return await makeRequest(
        BASE_API_URL + 'sendOobCode?key=' + API_KEY,
        {
            idToken: idToken,
            clientType: "CLIENT_TYPE_WEB",
            requestType: "VERIFY_EMAIL",
        }
    )
}

async function createUserWithoutLogin(email, password) {
    return await makeRequest(
        BASE_API_URL + 'signUp?key=' + API_KEY,
        {
            email: email,
            password: password,
            clientType: "CLIENT_TYPE_WEB",
            returnSecureToken: false, // Prevents auto-login
        }
    )
}