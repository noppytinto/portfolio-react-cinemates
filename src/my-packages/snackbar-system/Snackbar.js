import './global-style.css';
import styles from './Snackbar.module.css';
import * as ReactDOM from 'react-dom';
import * as assets from './utils/assets-manager';
import {useEffect, useState} from 'react';


function Snackbar(props) {
    const [isOpen, setIsOpen] = useState(props.isOpen ?? true);
    useEffect(() => {
        setIsOpen(props.isOpen);

    }, [props.isOpen])

    // const [isRendered, setIsRendered] = useState(props.isOpen ?? true);
    const [animateBeforeUnmount, setAnimateBeforeUnmount] = useState(false);
    // if (!isOpen) return null;

    const textContent = props.textContent ?? assets.stringTextContent;
    const actionLabel = props.actionLabel ?? assets.stringActionLabel;
    const onActionClick = props.onActionClick ?? (() => {});
    let snackbarContainerClasses = `${styles['snackbar-container']} ${(animateBeforeUnmount ? styles['close'] : styles['open'])}`;
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
        setAnimateBeforeUnmount(true);
    }


    // useEffect(()=>{
    //     if (timer.current) clearTimeout(timer.current);
    
    //     timer.current = setTimeout(() => {
    //         console.log('snackbar called');

    //         removeSnackbar();
    //     }, delay);
    
    // }, [timer, delay]);


    const handleAnimationEnd = () => {
        if (!animateBeforeUnmount) return;
        setIsOpen(false);
        setAnimateBeforeUnmount(false);
    };


    function rend(isOpen) {
        console.log('---------------------- SNACKBAR RENDERED');
        return (
            ReactDOM.createPortal(
                <div className={snackbarContainerClasses}
                     onAnimationEnd={handleAnimationEnd}>
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
                document.getElementById('snackbar')
            )
        );
        // if (isOpen) {
        //
        // }
        // else {
        //     console.log('---------------------- SNACKBAR NOT RENDERED');
        //     return null;
        // }
    }

    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (rend(isOpen));
}// Snackbar

export default Snackbar;