import styles from './ListButton.module.scss';
import { v4 as uuidv4 } from 'uuid';
import MoviePoster from './MoviePoster/MoviePoster';
import {useNavigate} from "react-router-dom";
import React from 'react';


function ListButton(props) {
    console.log('list button rendered');
    const movieIds = props.movies ?? [];
    const listName = props.listName ?? '';
    const title = props.title ?? '';
    const titleColor = props.titleColor ?? '#000';
    const ids = getFirstNItems(movieIds, 4);
    
    const navigate = useNavigate();


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function getFirstNItems(movieIds, n) {
        const ids = [];
        for (let i=0; i<n; i++) {
            ids.push(movieIds[i] ?? null);
        }
        return ids;
    }

    function navigateTo() {
        navigate('/movies-list', {state: {title, movieIds, listName}});
    }


    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <button className={`${styles['list-button']} ${props.className}`}
                onClick={navigateTo}>
            <div className={`${styles['list-button__gradient']}`}></div>
            <div className={`${styles['list-button__info']}`}>
                {/* TODO: <img className={`${styles['list-button__poster-image']}`}
                     src={movie.posterUrl} 
                     alt={movie.title} /> */}
                <p className={`${styles['list-button__title']}`}  style={{color: titleColor} }>{title}</p>
            </div>

            <ul className={`${styles['list-button__posters']}`}>
                {ids.map((id) =>
                    <li key={uuidv4()} className={`${styles['list-button__poster']}`}>
                        <MoviePoster className={`${styles['list-button__poster-image']}`}
                                     movieId={id} />
                    </li>
                )}
            </ul>
        </button>
    );
}// ListButton


function _propsAreEqual(prev, next) {
    const prevArray = prev.movieIds ?? [];
    const nextArray = next.movieIds ?? [];

    const arraysAreEqual = 
        prevArray.length === nextArray.length && 
        prevArray.every((value, index) => { return value === nextArray[index]});

    return arraysAreEqual;
}

export default React.memo(ListButton, _propsAreEqual);
// export default ListButton;