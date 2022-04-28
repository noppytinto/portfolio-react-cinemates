import { useState } from 'react';
import styles from './SearchPage.module.css';

function SearchPage() {
    let classes = `${styles['search-page']} `;
    let classesSearchBox = `${styles['search-page__box']} `;
    const [searchQuery, setSearchQuery] = useState('');
    

    ////////////////////////////
    // FUNCTIONS
    ////////////////////////////
    function onSubmitHandler(ev) {
        ev.preventdefault();
        setSearchQuery();
    }
    

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div className={classes}>
            <p>search result for: {searchQuery}</p>

            <div className={classesSearchBox}>
                <form onSubmit={onSubmitHandler}>
                    <input type={'search'} 
                           placeholder={'search...'}></input>
                </form>
            </div>
        </div>
    );
}// SearchPage

export default SearchPage;