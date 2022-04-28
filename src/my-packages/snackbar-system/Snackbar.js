import './global-style.css';
import styles from './Snackbar.module.css';
import * as ReactDOM from 'react-dom';
import * as assets from './utils/assets-manager';
import { useState } from 'react';
// import { useState } from 'react';
// import {useRef} from "react";


export function removeSnackbar() {
    const snackbar = document.getElementById('snackbar');
    snackbar.removeChild(snackbar.lastChild);
}

function Snackbar(props) {
    const textContent = props.textContent ?? assets.stringTextContent;
    const actionLabel = props.actionLabel ?? assets.stringActionLabel;
    const onActionClick = props.onActionClick ?? (() => {});
    let snackbarContainerClasses = `${styles['snackbar-container']} `;
    let classes = `${styles['snackbar']} ${props.className}`;
    let mainContentClasses = `${styles['snackbar__main-content']} `;
    let actionClasses = `${styles['snackbar__action']} `;
    let actionButtonClasses = `${styles['snackbar__action-button']} `;
    // const timer = useRef();
    // const delay = props.delay ?? assets.defaultDelay;
    const [isOpen, setIsOpen] = useState(props.isOpen ?? true);


    ////////////////////////////////////
    // functions
    ////////////////////////////////////
    function actionHandler(ev) {
        ev.preventDefault();
        onActionClick(ev);
        close();
    }

    function close(ev) {
        setIsOpen(false);
    }


    // useEffect(()=>{
    //     if (timer.current) clearTimeout(timer.current);
    
    //     timer.current = setTimeout(() => {
    //         console.log('snackbar called');

    //         removeSnackbar();
    //     }, delay);
    
    // }, [timer, delay]);




    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    if (!isOpen) return null;
    return (
        ReactDOM.createPortal(
            <div className={snackbarContainerClasses}>
                <div className={classes}>
                    <div className={mainContentClasses}>
                        {textContent}
                    </div>
                    <div className={actionClasses}>
                        <button className={actionButtonClasses}
                                type={"button"}
                                onClick={actionHandler}>
                            {actionLabel}
                        </button>
                    </div>
                </div>
            </div>,
            document.getElementById('snackbar'))
    );
}// Snackbar

export default Snackbar;