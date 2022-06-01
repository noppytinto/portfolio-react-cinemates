import styles from './Dialog.module.scss';
import ReactDOM from 'react-dom';


function Dialog(props) {
    const children = props.children;

    let classesDialogContainer = `${styles['dialog-container']}`;
    let classesDialog = `${styles['dialog']} ${props.className}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function onClickOutsideAreaHandler(ev) {
        if (ev.target.classList.contains(classesDialogContainer))
            props.onClickOuterArea();
    }


    //////////////////////////////
    // JSX
    //////////////////////////////
    return ReactDOM.createPortal(
        <div className={classesDialogContainer}
             onClick={onClickOutsideAreaHandler}>
            <div className={classesDialog}>
                {children}
            </div>
        </div>

        , document.getElementById('dialog')
    );

}// Dialog

export default Dialog;