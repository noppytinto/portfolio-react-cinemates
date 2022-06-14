import React from 'react';
import styles from './HeaderWithBackButton.module.scss';
import * as assets from '../../../utils/assets-manager';
import {useNavigate} from 'react-router-dom';


const HeaderWithBackButton = (props)=> {
    const classes = `${styles['header']} ${props.className} `;
    const title = props.title ?? assets.stringTitleMissing;
    const backTo = props.backTo ?? -1;
    const navigate = useNavigate();


    ////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////
    function onClickHandler() {
        navigate(backTo);
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
};// HeaderWithBackButton

export default React.memo(HeaderWithBackButton);
