import styles from './LoginPage.module.scss';
import * as assets from '../../../utils/assets-manager';
import {useNavigate} from 'react-router-dom';
import {authActions} from '../../../redux/slices/auth-slice'
import {useDispatch} from "react-redux";
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {useRef, useState} from "react";
import * as authService from '../../../services/auth-service';
import Dialog from '../../reusable/Dialog/Dialog';


function LoginPage(props) {
    const classesLoginPage = `${styles['login-page']}`;
    const classesLogoImage = `${styles['login-page__logo']}`;
    const classesForm = `${styles['login-page__form']}`;
    const classesInputLabel = `${styles['login-page__input-label']}`;
    const classesInputText = `${styles['login-page__input-text']}`;
    const classesLoginButton = `${styles['login-page__btn-login']}`;
    const classesParagraph = `${styles['login-page__paragraph']}`;
    const classesSignUpButton = `${styles['login-page__btn-signup']}`;

    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [showDialog, setShowDialog] = useState(false);

    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function onClickLoginHandler(ev) {
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;

        console.log('email:', email);
        console.log('pass:', pass);

        // authService.signIn(email, pass, (user) => {
        //     console.log('LOGIN SUCCESSFUL:', user);
        //     dispatcher(authActions.setIsLogged({isLogged: true}));
        //     navigate('/profile');
        // }, (errorCode, errorMessage) => {
        //     console.log('LOGIN FAIL');
        //     console.log('error code:', errorCode);
        //     console.log('error message:', errorMessage);
        // })

        setShowDialog(true);
    }

    function onClickOuterAreaHandler(ev) {
        setShowDialog(false);
        console.log('outer area clicked');

    }

    function onClickButtonLeftHandler() {

    }

    function onClickButtonRightHandler() {
        console.log('outer area clicked');
        setShowDialog(false);

    }



    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <div className={classesLoginPage}>
            <HeaderWithBackButton backButtonUrl={'/'} title={'Login'}/>

            <main>
                <img className={classesLogoImage}
                     src={assets.imageExtendedLogoNoLights}
                     alt={'app logo'}/>

                <form className={classesForm}>
                    <label className={classesInputLabel}
                           htmlFor={'email'}>Email</label>
                    <input id={'email'}
                           className={classesInputText}
                           type={'email'}
                           name={'email'}
                           placeholder={'user@mail.com'}
                           ref={emailRef}/>

                    <label className={classesInputLabel}
                           htmlFor={'password'}>Password</label>
                    <input id={'password'}
                           className={classesInputText}
                           type={'password'}
                           name={'password'}
                           placeholder={'******'}
                           ref={passwordRef}/>

                    <button className={classesLoginButton}
                            type={'button'}
                            onClick={onClickLoginHandler}> LOGIN </button>
                </form>

                <p className={classesParagraph}>or</p>
                <button className={classesSignUpButton}
                        type={'button'}> SIGN UP </button>
            </main>

            {showDialog && <Dialog message={'hello world'} 
                                   onClickOuterArea={onClickOuterAreaHandler} 
                                   buttonActionLeft={onClickButtonLeftHandler}
                                   buttonRightAction={onClickButtonRightHandler}
                                   buttonLeftLabel={'ok'}
                                   buttonRightLabel={'cancel'}
                                   />}
        </div>
    );
}

export default LoginPage;