import ReactDOM from 'react-dom';
import styles from './ActionDialog.module.scss';
import Dialog from '../Dialog';

function ActionDialog(props) {
    const title = props.title ?? '';
    // const message = props.message ?? 'message';
    const buttonLeftLabel = props.buttonLeftLabel ?? 'button 1';
    const buttonRightLabel = props.buttonRightLabel ?? 'button 2';
    const buttonLeftAction = props.buttonLeftAction ?? null;
    const buttonRightAction = props.buttonRightAction ?? null;
    const onClickOutsideAreaHandler = props.onClickOutsideArea;

    let classesDialog = `${styles['dialog']}`;
    let classesTitle = `${styles['dialog__title']}`;
    let classesMainContent = `${styles['dialog__main-content']} ${props.className}`;
    let classesButtons = `${styles['dialog__buttons']}`;
    let classesButtonLeft = `${styles['dialog__button']} ${styles['dialog__button-left']}`;
    let classesButtonRight = `${styles['dialog__button']} ${styles['dialog__button-right']}`;




    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////



    //////////////////////////////
    // JSX
    //////////////////////////////
    const dialog = (
        <Dialog className={classesDialog} onClickOuterArea={onClickOutsideAreaHandler}>
            {title ?? <h1 className={classesTitle}>{title}</h1>}
            <div className={classesMainContent}>{props.children}</div>
            <div className={classesButtons}>
                <button className={classesButtonLeft}
                        type={'button'}
                        onClick={buttonLeftAction}>{buttonLeftLabel}</button>
                <button className={classesButtonRight}
                        type={'button'}
                        onClick={buttonRightAction}>{buttonRightLabel}</button>
            </div>
        </Dialog>
    );
    // return ReactDOM.createPortal(dialog, document.getElementById('dialog'));
    return dialog;
}// ActionDialog

export default ActionDialog;