import * as authService from '../services/auth-service';
import {
    doc,
    getFirestore,
    setDoc,
    arrayUnion,
    arrayRemove,
    updateDoc
} from "firebase/firestore";


export async function addMovieToList(listName, movieId) {
    if (!movieId) {
        console.log('cannot insert movie: movieId is null');
        return;
    }

    const firebaseApp = authService.getFirebaseApp();
    const db = getFirestore(firebaseApp);
    const currentUserId = authService.getFirebaseAuth().currentUser.uid;

    const listRef = doc(db, "users", currentUserId);
    const newData = {
        [`lists.${listName}`]: arrayUnion(movieId)
    }
    await updateDoc(listRef, newData);

    console.log(`movie:${movieId} added to: ${listName}`);
}

export async function removeMovieFromList(listName, movieId) {
    if (!movieId) {
        console.log('cannot remove movie: movieId is null');
        return;
    }

    const firebaseApp = authService.getFirebaseApp();
    const db = getFirestore(firebaseApp);
    const currentUserId = authService.getFirebaseAuth().currentUser.uid;

    const listRef = doc(db, "users", currentUserId);
    const newData = {
        [`lists.${listName}`]: arrayRemove(movieId)
    }
    await updateDoc(listRef, newData);

    console.log(`movie:${movieId} removed from: ${listName}`);
}

export async function updateMovieList(listKey, updatedList) {
    if (!listKey || !updatedList) {
        console.log('cannot update list: listKey/updatedList is null');
        return;
    }

    const firebaseApp = authService.getFirebaseApp();
    const db = getFirestore(firebaseApp);
    const currentUserId = authService.getFirebaseAuth().currentUser.uid;

    const listRef = doc(db, "users", currentUserId);
    const newData = {
        [`lists.${listKey}`]: updatedList
    }
    await updateDoc(listRef, newData);

    console.log(`list:${listKey} updated with: ${updatedList}`);
}

export function addMovieToWatchlist(movieId) {
    const WATCHLIST_KEY = 'watchlist'
    addMovieToList(WATCHLIST_KEY, movieId)
}

export async function createUser(id, email, username, imageId='') {
    const firebaseApp = authService.getFirebaseApp();
    const db = getFirestore(firebaseApp);
    
    await setDoc(doc(db, "users", id), {
        email: email,
        username: username,
        imageId: imageId,
        lists: {
            favorites: [],
            watched: [],
            watchlist: [],
        }
      });
}