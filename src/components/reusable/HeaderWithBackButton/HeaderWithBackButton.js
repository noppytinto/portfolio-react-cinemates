import styles from './HeaderWithBackButton.module.css';
import * as assets from '../../../utils/assets-manager';
import {useNavigate} from 'react-router-dom';
import BackIcon from '../Icons/arrow_back_FILL0_wght400_GRAD0_opsz48.svg'


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
                <img className={styles['header__btn-back-icon']}
                     src={BackIcon}
                     alt={''}/>
            </button>

            <p className={styles['header__title']}>{title}</p>
        </header>
    );
}// HeaderWithBackButton

export default HeaderWithBackButton;