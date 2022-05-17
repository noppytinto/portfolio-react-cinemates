import ReactDOM from 'react-dom';
import styles from './Dialog.module.scss';


function Dialog(props) {
    const onClickOuterAreaHandler = props.onClickOuterArea;
    const children = props.children;
    
    let classesDialogContainer = `${styles['dialog-container']}`;
    let classesDialog = `${styles['dialog']} ${props.className}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////



    //////////////////////////////
    // JSX
    //////////////////////////////
    const dialog = (
        <div className={classesDialogContainer} onClick={onClickOuterAreaHandler}>
            <div className={classesDialog}>
                {children}
            </div>
        </div>
    );
    return dialog;
}// Dialog

export default Dialog;