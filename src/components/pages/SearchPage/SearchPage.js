import styles from './SearchPage.module.css';
import PlaceholderPage from "../../reusable/PlaceholderPage/PlaceholderPage";

function SearchPage() {

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div className={`${styles['search-page']}`}>
            <PlaceholderPage>
                <p>Search page</p>
            </PlaceholderPage>
        </div>
    );
}

export default SearchPage;