import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {initializeApp} from "firebase/app";


export function init() {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
    };

    initializeApp(firebaseConfig);
    console.log('auth service initilized');
}

export function createUserAccount(email, password, onSuccess, onFailure) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            onSuccess(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..

            onFailure(errorCode, errorMessage);
        });
}

export function signIn(email, password, onSuccess, onFailure) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...

            onSuccess(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            onFailure(errorCode, errorMessage);
        });
}

export function logout(onSuccess, onFailure) {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            onSuccess();
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            onFailure(errorCode, errorMessage);
        });
}

