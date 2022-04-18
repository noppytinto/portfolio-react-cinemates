import styles from './ExplorePage.module.css';
import PlaceholderPage from "../reusable/PlaceholderPage/PlaceholderPage";

function ExplorePage() {

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div className={`${styles['explore-page']}`}>
            <PlaceholderPage>
                <p>Explore page</p>
            </PlaceholderPage>
        </div>
    );
}

export default ExplorePage;