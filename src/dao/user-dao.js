import * as authService from '../services/auth-service';
import {doc, getFirestore, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


export async function addToList(listName, movieId) {
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

export async function removeFromList(listName, movieId) {
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



export function addToWatchlist(movieId) {
    const WATCHLIST_KEY = 'watchlist'
    addToList(WATCHLIST_KEY, movieId)
}