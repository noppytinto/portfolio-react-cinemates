import styles from './HeaderWithBackButton.module.scss';
import * as assets from '../../../utils/assets-manager';
import {useNavigate} from 'react-router-dom';


function HeaderWithBackButton(props) {
    let classes = `${styles['header']} ${props.className} `;
    const title = props.title ?? assets.stringTitleMissing;
    const navigate = useNavigate();


    ////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////
    function onClickHandler() {
        navigate(-1);
    }


    ////////////////////////////////
    // JSX
    ////////////////////////////////
    return (
        <header className={classes}>
            <button className={styles['header__btn-back']}
                    onClick={onClickHandler}>
                <assets.IconBack className={styles['header__icon-back']} />

                {/*<img className={styles['header__btn-back-icon']}*/}
                {/*     src={BackIcon}*/}
                {/*     alt={''}/>*/}
            </button>

            <p className={styles['header__title']}>{title}</p>
        </header>
    );
}// HeaderWithBackButton

export default HeaderWithBackButton;