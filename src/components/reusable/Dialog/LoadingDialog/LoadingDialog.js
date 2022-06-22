import styles from './LoadingDialog.module.scss';
import Dialog from '../Dialog';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';


function LoadingDialog(props) {
    const message = props.message ?? '';
    const onClickOutsideHandler = props.onClickOutside;


    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <Dialog className={`${styles['dialog']} ${props.className}`} onClickOutside={onClickOutsideHandler}>
            <LoadingSpinner className={`${styles['loading-spinner']}`}/>
            <p className={`${styles['dialog__message']}`}>{message}</p>
        </Dialog>
    );
}// LoadingDialog

export default LoadingDialog;