// WithRoundBorders(WithFetcher(MoviePoster))
import MoviePoster from "../MoviePoster";
import {useEffect, useState} from "react";
import {fetchMovie} from "../../../../services/movie-database-service";


export function withFetcher(MoviePoster){
    return ({...props}) => {
        const movieId = props.movieId ?? null;
        const [movie, setMovie] = useState({title: '', posterUrl: null});


        ////////////////////////////////////
        // FUNCTIONS
        ////////////////////////////////////
        useEffect(() => {
            if (!movieId) return;
            
    
            (async () => {
                const mov = await fetchMovie(movieId);
                setMovie(mov);
            })();
        }, [setMovie, movieId]);
    


        ////////////////////////////////////
        // JSX
        ////////////////////////////////////
        return <MoviePoster posterImageUrl={movie.posterUrl} 
                            movieTitle={movie.title} 
                            alt={movie.title} 
                            {...props} />;
    };
} 


export default withFetcher(MoviePoster);

   