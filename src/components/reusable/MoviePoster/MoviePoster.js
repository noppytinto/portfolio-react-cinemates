import styles from './MoviePoster.module.scss';
import * as assets from '../../../utils/assets-manager';
import { useEffect, useState } from 'react';


function MoviePoster(props) {
    let movieTitle = props.movieTitle ?? '';
    let shadowed = props.shadowed ?? true;
    let posterUrl= props.posterImageUrl || '';
    let lazy = props.lazy ?? false;

    let classes = `${styles['movie-poster']} ${props.className} `;
    let imageClasses = `${styles['movie-poster__image']} `;
    let movieTitleClasses = `${styles['movie-title']} hidden`;

    if (shadowed) classes = `${classes} ${styles['movie-poster--shadowed']} `;

    if (!posterUrl) {
        posterUrl = assets.iconBrokenImage;
        classes = `${styles['movie-poster']} ${props.className} ${styles['movie-poster--broken']}`;
        imageClasses = `${styles['movie-poster__image']} ${styles['movie-poster__image--broken']}`;
        movieTitleClasses = `${styles['movie-title']}`;
    }

    function handleOnErrorImageSource(ev) {

    }

    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (
        <div className={classes} >
            <img className={imageClasses}
                 src={posterUrl}
                 alt={movieTitle}
                 draggable={'false'}
                 loading={lazy ? 'lazy' : 'eager'}
                 data-testid={"image"}
                 onError={handleOnErrorImageSource}
                 />
            <p className={movieTitleClasses}
               data-testid={"title"}> 
               {movieTitle} </p>
        </div>
    );
}

export default MoviePoster;