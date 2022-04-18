import styles from './SearchPage.module.css';
import * as assetsManager from '../../utils/AssetsManager';
import { NavLink } from 'react-router-dom';
import PlaceholderPage from "../reusable/PlaceholderPage/PlaceholderPage";

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