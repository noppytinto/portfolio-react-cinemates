import styles from './ExplorePage.module.css';
import HorizontalMovieList from "./HorizontalMoviesList/HorizontalMovieList";

function ExplorePage() {

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div className={`${styles['explore-page']}`}>
            <ul className={`${styles['explore-list']}`}>
                <li className={`${styles['explore-item']}`}>
                    <HorizontalMovieList title={'Upcoming'} buttonText={'See all'}/>
                </li>
                <li className={`${styles['explore-item']}`}>
                    <HorizontalMovieList title={'Popular'} buttonText={'See all'}/>
                </li>
                <li className={`${styles['explore-item']}`}>
                    <HorizontalMovieList title={'Coming soon'} buttonText={'See all'}/>
                </li>
            </ul>
        </div>
    );
}

export default ExplorePage;