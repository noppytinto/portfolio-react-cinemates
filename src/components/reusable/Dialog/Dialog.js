import styles from './Dialog.module.scss';
import {useState} from "react";


function Dialog(props) {
    const children = props.children;

    let classesDialogBackdrop = `${styles['dialog-backdrop']}`;
    let classesDialog = `${styles['dialog']} ${props.className}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function onClickOutsideHandler(ev) {
        if (ev.target.classList.contains(classesDialogBackdrop)) {
            props.onClickOutside();
        }
    }


    //////////////////////////////
    // JSX
    //////////////////////////////

    return (
        <div className={classesDialogBackdrop}
             onClick={onClickOutsideHandler}>
            <div className={classesDialog}>
                {children}
            </div>
        </div>
    );
}// Dialog

export default Dialog;