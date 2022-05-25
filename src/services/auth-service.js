import {
    getAuth,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {initializeApp} from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// global properties
let firebaseApp = null;
let auth = null;

//
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

    firebaseApp = initializeApp(firebaseConfig);
    console.log('auth service initilized');

    auth = getAuth();

}

export function listenAuthStateChanges(onStateChanged) {
    // listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        onStateChanged(user);
    });
}

export function createUserAccount(email, password, onSuccess, onFailure) {
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

export async function getUserData(userId) {
    let userData = null;

    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        userData = docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    return userData;
}

export function getProfileImageByUsername(username) {
    const profileImagesRef = _getProfileImagesRef();
    const fileName = username;
    const extensionJpg = '.jpg';

    const image = ref(profileImagesRef, fileName + extensionJpg);

    return image;
}

function _getProfileImagesRef() {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage);
    const profileImagesRef = ref(storageRef, 'profileImages');
    return profileImagesRef;
}


// web browser use "local" as default persistence
//
// function _setAuthStatePersistence() {
//     setPersistence(auth, browserLocalPersistence)
//         .then(() => {
//             // Existing and future Auth states are now persisted in the current
//             // session only. Closing the window would clear any existing state even
//             // if a user forgets to sign out.
//             // ...
//             // New sign-in will be persisted with session persistence.
//             // return signInWithEmailAndPassword(auth, email, password);
//         })
//         .catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//         });
// }