import styles from './LoginPage.module.scss';
import * as assets from '../../../utils/assets-manager';
import {useNavigate} from 'react-router-dom';
import {authActions} from '../../../redux/slices/auth-slice'
import {useDispatch} from "react-redux";
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {useRef} from "react";
import * as authService from '../../../services/auth-service';


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



    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function onClickLoginHandler(ev) {
        ev.preventDefault();
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;

        console.log('email:', email);
        console.log('pass:', pass);

        authService.signIn(email, pass, (user) => {
            console.log('LOGIN SUCCESSFUL:', user);
            dispatcher(authActions.setIsLogged({isLogged: true}));
            navigate('/profile');
        }, (errorCode, errorMessage) => {
            console.log('LOGIN FAIL');
            console.log('error code:', errorCode);
            console.log('error message:', errorMessage);
        })
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
        </div>
    );
}

export default LoginPage;