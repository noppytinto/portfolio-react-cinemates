import './global-style.css';
import styles from './Snackbar.module.css';
import * as ReactDOM from 'react-dom';
import * as assets from './utils/assets-manager';
import { useState } from 'react';


function Snackbar(props) {
    const [isOpen, setIsOpen] = useState(props.isOpen ?? true);
    if (!isOpen) return null;

    const textContent = props.textContent ?? assets.stringTextContent;
    const actionLabel = props.actionLabel ?? assets.stringActionLabel;
    const onActionClick = props.onActionClick ?? (() => {});
    let snackbarContainerClasses = `${styles['snackbar-container']} ${styles['open']}`;
    let classes = `${styles['snackbar']} ${props.className}`;
    let mainContentClasses = `${styles['snackbar__main-content']} `;
    let actionClasses = `${styles['snackbar__action']} `;
    let actionButtonClasses = `${styles['snackbar__action-button']} `;


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