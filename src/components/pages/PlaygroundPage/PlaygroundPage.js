import styles from './PlaygroundPage.module.scss';
import HorizontalMovieList from '../ExplorePage/HorizontalMoviesList/HorizontalMovieList';
import ListHeader from '../ExplorePage/HorizontalMoviesList/ListHeader/ListHeader';
import MoviePoster from '../../reusable/MoviePoster/MoviePoster';
import OutlineButton from '../../reusable/OutlineButton/OutlineButton';
import * as assetsManager from '../../../utils/assets-manager';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../redux/slices/auth-slice";



function PlaygroundPage() {
    const dispatcher = useDispatch();
    const userData = useSelector(state => state.authSlice.userData);
    const isLogged = useSelector(state => state.authSlice.isLogged);
    console.log('user data', userData);
    console.log('user is logged:', isLogged);

    function changeState() {
        dispatcher(authActions.setIsLogged({isLogged: !isLogged}));
    }




    return (
        <div>
            <p>is logged: {isLogged ? 'true': 'false'}</p>
            <h1>Header</h1>
            <OutlineButton onClick={changeState}>Outlined Button</OutlineButton>

            <ListHeader title='Up next' buttonText='See all' />
            <MoviePoster posterImageUrl={assetsManager.moviePoster_11} />
            <br /><br />
            <HorizontalMovieList />
        </div>
    );
}

export default PlaygroundPage;
