import { useState } from 'react';
import styles from './SearchPage.module.scss';
import * as assets from '../../../utils/assets-manager';


function SearchPage(props) {
    let classesSearchPage = `${styles['search-page']} `;
    let classesSearchLabel = `${styles['search-page__label']} `;
    let classesSearchResults = `${styles['search-page__results']} `;

    let classesSearchBox = `${styles['search-page__box']} `;
    let classesSearchContainerInput = `${styles['search-page__container-input']} `;
    let classesSearchInput = `${styles['search-page__input']} `;
    let classesSearchButton = `${styles['search-page__button']} `;
    let classesSearchIcon = `${styles['search-page__icon']} `;

    const [searchQuery, setSearchQuery] = useState('');
    

    ////////////////////////////
    // FUNCTIONS
    ////////////////////////////
    function onSubmitHandler(ev) {
        ev.preventDefault();
        setSearchQuery();
    }
    

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div className={classesSearchPage}>
            {/**************************** SEARCH RESULTS*/}
            <p className={classesSearchLabel}>{assets.stringLabelSearch} {searchQuery}</p>

            <div className={classesSearchResults}>
                    <ul>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                        <li>aasdfvkjnfkbjenkjvnejrnjenfr</li>
                    </ul>
            </div>


            {/**************************** SEARCH BOX*/}
            <div className={classesSearchBox}>
                <form onSubmit={onSubmitHandler}>
                    <div className={classesSearchContainerInput}>
                        <input className={classesSearchInput}
                            type={'search'} 
                            placeholder={assets.stringPlaceholderSearch}></input>
            
                        <button className={classesSearchButton} 
                                type={'button'}>
                            <assets.IconSearch  className={classesSearchIcon}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}// SearchPage

export default SearchPage;