import styles from './Error404.module.css';


function Error404() {
    const classes = `${styles['error-404']}`;
    
    return (
        <div className={classes}>
            <h1>404 - Not Found!</h1>
        </div>
    );
}

export default Error404;