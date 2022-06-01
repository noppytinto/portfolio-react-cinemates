import ReactDOM from 'react-dom';
import styles from './ActionDialog.module.scss';
import Dialog from '../Dialog';

function ActionDialog(props) {
    const title = props.title ?? '';
    const buttonNegativeLabel = props.buttonNegativeLabel ?? 'cancel';
    const buttonPositiveLabel = props.buttonPositiveLabel ?? 'ok';
    const buttonNegativeAction = props.buttonNegativeAction ?? null;
    const buttonPositiveAction = props.buttonPositiveAction ?? null;
    const onClickOutsideAreaHandler = props.onClickOutsideArea;

    let classesDialog = `${styles['dialog']}`;
    let classesTitle = `${styles['dialog__title']}`;
    let classesMainContent = `${styles['dialog__main-content']} ${props.className}`;
    let classesButtons = `${styles['dialog__buttons']}`;
    let classesButtonNegative = `${styles['dialog__button']} ${styles['dialog__button-negative']}`;
    let classesButtonPositive = `${styles['dialog__button']} ${styles['dialog__button-positive']}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////


    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <Dialog className={classesDialog}
                onClickOuterArea={onClickOutsideAreaHandler}>

            {title ?? <h1 className={classesTitle}>{title}</h1>}

            <div className={classesMainContent}>{props.children}</div>

            <div className={classesButtons}>
                <button className={classesButtonNegative}
                        type={'button'}
                        onClick={buttonNegativeAction}>{buttonNegativeLabel}</button>

                <button className={classesButtonPositive}
                        type={'button'}
                        onClick={buttonPositiveAction}>{buttonPositiveLabel}</button>
            </div>
        </Dialog>
    );
}// ActionDialog

export default ActionDialog;