import styles from './LoadingDialog.module.scss';
import Dialog from '../Dialog';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

function LoadingDialog(props) {
    const message = props.message ?? '';
    const onClickOutsideHandler = props.onClickOutside;

    let classesDialog = `${styles['dialog']} ${props.className}`;
    let classesMessage = `${styles['dialog__message']}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////



    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <Dialog className={classesDialog} onClickOutside={onClickOutsideHandler}>
            <LoadingSpinner />
            <p className={classesMessage}>{message}</p>
        </Dialog>
    );
}// LoadingDialog

export default LoadingDialog;