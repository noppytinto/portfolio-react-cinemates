import styles from './ListButton.module.scss';
import { v4 as uuidv4 } from 'uuid';
import MoviePoster from './MoviePoster/MoviePoster';


function ListButton(props) {
    const movieIds = props.movies ?? [];

    const title = props.title ?? '';
    const titleColor = props.titleColor ?? '#000';

    console.log(movieIds);

    const ids = getFirstNItems(movieIds, 4);


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




    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <button className={`${styles['list-button']} ${props.className}`}>
            <div className={`${styles['list-button__gradient']}`}></div>
            <div className={`${styles['list-button__info']}`}>
                {/* <img className={`${styles['list-button__poster-image']}`} 
                     src={movie.posterUrl} 
                     alt={movie.title} /> */}
                <p className={`${styles['list-button__title']}`}  style={{color: titleColor} }>{title}</p>

            </div>

            <ul className={`${styles['list-button__posters']}`}>

                {ids.map((id) => {
                    return (
                        <li key={uuidv4()} className={`${styles['list-button__poster']}`}>
                            <MoviePoster className={`${styles['list-button__poster-image']}`} 
                                         movieId={id} />
                        </li>
                    );
                })}

            </ul>
        </button>
    );

}// ListButton

export default ListButton;