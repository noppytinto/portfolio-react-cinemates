import styles from './ActionBar.module.scss';
import * as assets from '../../../utils/assets-manager';


function ActionBar(props) {
    const title = props.title ?? '';
    const onClickCancelHandler = props.onClickCancel ?? (()=>{});
    const onClickDeleteHandler = props.onClickDelete ?? (()=>{});
    const onClickSelectAllHandler = props.onClickSelectAll ?? (()=>{});


    ////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////




    ////////////////////////////////
    // JSX
    ////////////////////////////////
    return (
        <div className={`${styles['action-bar']} ${props.className}`}>
            <button className={`${styles['action-bar__btn']} ${styles['action-bar__btn--cancel']}`}
                    onClick={onClickCancelHandler}>
                <assets.IconClear className={styles['action-bar__icon']} />
            </button>

            <p className={styles['action-bar__title']}>{title}</p>

            <div className={`${styles['action-bar__action-buttons']}`}>
                <button className={`${styles['action-bar__btn']}`}
                            onClick={onClickDeleteHandler}>
                    <assets.IconBin className={styles['action-bar__icon']} />
                </button>
                <button className={`${styles['action-bar__btn']}`}
                            onClick={onClickSelectAllHandler}>
                    <assets.IconSelectAll className={styles['action-bar__icon']} />
                </button>
            </div>
        </div>
    );

}// ActionBar

export default ActionBar;