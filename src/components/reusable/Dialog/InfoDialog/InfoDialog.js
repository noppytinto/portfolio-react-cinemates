import ReactDOM from 'react-dom';
import styles from './InfoDialog.module.scss';
import Dialog from '../Dialog';


function InfoDialog(props) {
    const title = props.title ?? '';
    const message = props.message ?? 'message';
    const onClickOuterAreaHandler = props.onClickOuterArea;

    let classesDialog = `${styles['dialog']} ${props.className}`;
    let classesTitle = `${styles['dialog__title']}`;
    let classesMessage = `${styles['dialog__message']}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////



    //////////////////////////////
    // JSX
    //////////////////////////////
    const dialog = (
        <Dialog className={classesDialog} onClickOuterArea={onClickOuterAreaHandler}>
            {title ?? <h1 className={classesTitle}>{title}</h1>}
            <p className={classesMessage}>{message}</p>
        </Dialog>
    );
    return ReactDOM.createPortal(dialog, document.getElementById('dialog'));
}// InfoDialog

export default InfoDialog;