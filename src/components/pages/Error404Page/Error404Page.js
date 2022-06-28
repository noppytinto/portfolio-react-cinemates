import styles from './Error404Page.module.scss';

function Error404Page() {


    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <div className={`${styles['error-404']}`}>
            <h1>404 - Not Found!</h1>
        </div>
    );
}// Error404Page

export default Error404Page;