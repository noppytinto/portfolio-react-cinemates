import styles from './HeaderWithBackButton.module.css';
// import * as assetsManager from '../../../utils/assets-manager';
import { NavLink } from 'react-router-dom';
import BackIcon from '../Icons/arrow_back_FILL0_wght400_GRAD0_opsz48.svg'


function HeaderWithBackButton(props) {
    let classes = `${styles['header']} ${props.className} `;
    const title = props.title ?? '(no title)';
    const backButtonUrl = props.backButtonUrl ?? '/';


    ////////////////////////////////
    // JSX
    ////////////////////////////////
    return (
        <header className={classes}>
            <NavLink className={styles['header__btn-back']}
                     to={backButtonUrl}>
                <img className={styles['header__btn-back-icon']}
                     src={BackIcon}
                     alt={''}/>
            </NavLink>

            <p className={styles['header__title']}>{title}</p>
        </header>
    );
}

export default HeaderWithBackButton;