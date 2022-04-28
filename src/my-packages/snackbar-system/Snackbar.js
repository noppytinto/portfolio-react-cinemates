import './global-style.css';
import styles from './Snackbar.module.css';
import * as ReactDOM from 'react-dom';
import * as assets from './utils/assets-manager';
import { unmountComponentAtNode } from "react-dom";
import {useEffect, useRef} from "react";

function Snackbar(props) {
    const textContent = props.textContent ?? assets.stringTextContent;
    const actionLabel = props.actionLabel ?? assets.stringActionLabel;
    const onActionClick = props.onActionClick ?? ((ev)=>undefined);
    const delay = props.delay ?? assets.defaultDelay;
    let snackbarContainerClasses = `${styles['snackbar-container']} `;
    let classes = `${styles['snackbar']} ${props.className}`;
    let mainContentClasses = `${styles['snackbar__main-content']} `;
    let actionClasses = `${styles['snackbar__action']} `;
    let actionButtonClasses = `${styles['snackbar__action-button']} `;
    const timer = useRef();


    ////////////////////////////////////
    // functions
    ////////////////////////////////////
    function actionHandler(ev) {
        ev.preventDefault();
        onActionClick(ev);
    }

    // useEffect(()=>{
    //     if (timer.current) clearTimeout(timer.current);
    //
    //     timer.current = setTimeout(() => {
    //         unmountComponentAtNode(document.querySelector(`${styles['snackbar-container']}`))
    //     }, delay);
    //
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