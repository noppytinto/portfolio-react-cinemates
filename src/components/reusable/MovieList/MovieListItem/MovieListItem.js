import React from 'react';
import styles from './MovieListItem.module.css';
import MoviePoster from '../../MoviePoster/MoviePoster';
// import * as assetsManager from '../../../../utils/assets-manager';



const MovieListItem = React.forwardRef((props, ref) =>{
    const movie = props.movie;
    let classes = `${styles['movie-list-item']} `;

    return (
        <div className={classes} ref={ref} >
            <div  className={styles['movie-poster']}>
                <MoviePoster shadowed={false}
                             posterImageUrl={movie.posterUrl}
                             alt={movie.title}
                             movieTitle={movie.title}/>
            </div>

            <div className={styles['text-content']}>
                <h2 className={styles['movie-title']}>{movie.title}</h2>
                <p className={styles['movie-overview']}>{movie.overview}</p>
            </div>
        </div>
    );
});





// function MovieListItem({movie, innerRef}) {
//     let classes = `${styles['movie-list-item']} `;
//
//     return (
//         <div className={classes} >
//             <div  className={styles['movie-poster']}>
//             <MoviePoster shadowed={false}
//                          posterImageUrl={movie.posterUrl}
//                          alt={movie.title}
//                          movieTitle={movie.title}/>
//
//             </div>
//
//             <div className={styles['text-content']}>
//                 <h2 className={styles['movie-title']}>{movie.title}</h2>
//                 <p className={styles['movie-overview']}>{movie.overview}</p>
//             </div>
//         </div>
//     );
// }

export default MovieListItem;