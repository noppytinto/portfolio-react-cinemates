import LoadingSpinner from "../../reusable/LoadingSpinner/LoadingSpinner";
import styles from './LoadingPage.module.scss';


function LoadingPage() {

    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <div className={`${styles['loading-page']}`}>
            <LoadingSpinner>404 - Not Found!</LoadingSpinner>
        </div>
    );
}// LoadingPage

export default LoadingPage;