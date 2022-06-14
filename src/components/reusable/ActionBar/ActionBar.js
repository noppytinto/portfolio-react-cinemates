import styles from './ActionBar.module.scss';
import * as assets from '../../../utils/assets-manager';


function ActionBar(props) {
    const title = props.title ?? '';
    const onClickCancelHandler = props.onClickCancel ?? (()=>{});



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
        </div>
    );

}// ActionBar

export default ActionBar;