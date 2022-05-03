import './global-style.scss';
import styles from './Snackbar.module.scss';
import * as ReactDOM from 'react-dom';
import * as assets from './utils/assets-manager';
import {useState} from 'react';


function Snackbar(props) {
    // props
    const text = props.text ?? assets.stringSnackbarDefaultText;
    const actionLabel = props.actionLabel ?? assets.stringSnackbarActionLabel;
    const onClickAction = props.onClickAction ?? (() => {});

    // states
    const [isShown, setIsShown] = useState(true);
    const [toBeDisposed, setToBeDisposed] = useState(false);

    // classes
    let snackbarContainerClasses = `${styles['snackbar-container']} ${styles['open']}`;
    if (toBeDisposed) {
        snackbarContainerClasses = `${styles['snackbar-container']} ${styles['close']}`;
    }
    let classes = `${styles['snackbar']} ${props.className}`;
    let mainContentClasses = `${styles['snackbar__main-content']} `;
    let actionClasses = `${styles['snackbar__action']} `;
    let actionButtonClasses = `${styles['snackbar__action-button']} `;



    ////////////////////////////////////
    // functions
    ////////////////////////////////////
    function dispose() {
        setToBeDisposed(true);
    }

    function actionHandler(ev) {
        ev.preventDefault();
        onClickAction({dispose});
    }

    const handleAnimationEnd = () => {
        if (toBeDisposed) {
            setIsShown(false);
        }
    };

    function render() {
        return (
            ReactDOM.createPortal(
                <div className={snackbarContainerClasses}
                     onAnimationEnd={handleAnimationEnd}>
                    <div className={classes}>
                        <div className={mainContentClasses}>
                            {text}
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
    }// render()


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (isShown && render());
}// Snackbar

export default Snackbar;