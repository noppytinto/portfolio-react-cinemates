import styles from './Error404Page.module.css';


function Error404Page() {
    const classes = `${styles['error-404']}`;
    
    return (
        <div className={classes}>
            <h1>404 - Not Found!</h1>
        </div>
    );
}

export default Error404Page;