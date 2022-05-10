import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {initializeApp} from "firebase/app";

export function init() {
    const firebaseConfig = {
        apiKey: "AIzaSyCidA5N15VzzlbCigsjPNj9HB0vRO0kyLU",
        authDomain: "cinemates-react.firebaseapp.com",
        projectId: "cinemates-react",
        storageBucket: "cinemates-react.appspot.com",
        messagingSenderId: "512895330736",
        appId: "1:512895330736:web:f0874f15c2cb92fe920e75",
        measurementId: "G-E1MKYW7KJJ"
    };

    initializeApp(firebaseConfig);
    // const app = initializeApp(firebaseConfig);
    // console.log('auth service initilized:', app);
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

export function signOut() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
}

