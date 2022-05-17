import styles from './LoadingSpinner.module.scss';

function LoadingSpinner(props) {
    const classes = `${styles['lds-ring']}`;

    return (
        <div className={classes}>
            <div></div><div></div><div></div><div></div>
        </div>
    );


}// LoadingSpinner

export default LoadingSpinner;