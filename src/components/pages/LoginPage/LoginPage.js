import styles from './LoginPage.module.scss';
import React, {useRef, useState} from 'react';
import * as assets from '../../../utils/assets-manager';
import {useNavigate} from 'react-router-dom';
import {authActions} from '../../../redux/slices/auth-slice'
import {useDispatch} from "react-redux";
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import * as authService from '../../../services/auth-service';
import LoadingDialog from '../../reusable/Dialog/LoadingDialog/LoadingDialog';
import TextField from '../../reusable/TextField/TextField';
import {motion} from 'framer-motion';

function LoginPage(props) {
    const classesLoginPage = `${styles['login-page']}`;
    const classesHeader = `${styles['header']}`;
    const classesLogoImage = `${styles['login-page__logo']}`;
    const classesForm = `${styles['login-page__form']}`;
    const classesLoginButton = `${styles['login-page__btn-login']}`;
    const classesParagraph = `${styles['login-page__paragraph']}`;
    const classesSignUpButton = `${styles['login-page__btn-signup']}`;

    const navigate = useNavigate();

    const dispatcher = useDispatch();

    const emailRef = React.createRef();
    const passwordRef = useRef();

    const [showDialog, setShowDialog] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);

    let emailErrorText = useRef('');
    let passwordErrorText = useRef('');

    
    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function onClickLoginHandler(ev) {
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;

        if (! validateInput(email, pass)) return;

        setShowDialog(true);
        authService.signIn(email.trim(), pass.trim(), async (user) => {
            console.log('LOGIN SUCCESSFUL:', user);

            dispatcher(authActions.setIsLogged({isLogged: true}));
            const userData = await authService.getUserData(user.uid);
            userData.firebaseId = user.uid;
            dispatcher(authActions.setUserData({userData}));

            setEmailIsValid(true);
            setPasswordIsValid(true);
            setShowDialog(false);
           
            navigate('/profile');

        }, (errorCode, errorMessage) => {
            setShowDialog(false);
            processErrorCodes(errorCode, errorMessage);
        })
    }

    function processErrorCodes(errorCode, errorMessage) {
        console.log('LOGIN FAIL');
        console.log('error code:', errorCode);
        console.log('error message:', errorMessage);

        switch(errorCode) {
            case 'auth/invalid-email': 
                emailErrorText.current = 'invalid email';
                setEmailIsValid(false);
                setPasswordIsValid(true);
                break;
            case 'auth/user-not-found': 
                emailErrorText.current = 'user not found';
                passwordErrorText.current = 'user not found';
                setEmailIsValid(false);
                setPasswordIsValid(false);
                break;
            case 'auth/wrong-password': 
                passwordErrorText.current = 'wrong password';
                setEmailIsValid(true);
                setPasswordIsValid(false);
                break;
            case 'auth/too-many-requests': 
                emailErrorText.current = 'too many requests, temporary blocked';
                passwordErrorText.current = 'too many requests, temporary blocked';
                setEmailIsValid(false);
                setPasswordIsValid(false);
                break;
            default: 
                emailErrorText.current = 'internal error';
                passwordErrorText.current = 'internal error';
                setEmailIsValid(false);
                setPasswordIsValid(false);
        }
    }

    function validateInput(email, password) {
        let isValid = true;

        if (!email.trim()) {
            emailErrorText.current = 'empty field';
            setEmailIsValid(false);
            isValid = false;
        }

        if (!password.trim()) {
            passwordErrorText.current = 'empty field';
            setPasswordIsValid(false);
            isValid = false;
        }

        return isValid;
    }


    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <motion.div className={classesLoginPage}
                    initial="hidden"
                    animate="visible"
                    // exit="hidden"
                    variants={props.variants}
        >
            <HeaderWithBackButton className={classesHeader} 
                                  backButtonUrl={'/'} 
                                  title={'Login'} />

            <main>
                <img className={classesLogoImage}
                     src={assets.imageExtendedLogoNoLights}
                     alt={'app logo'}/>

                <form className={classesForm}>
                    <TextField type={'email'}
                               name={'email'}
                               placeholder={'user@mail.com'}
                               ref={emailRef}
                               label={'Email'}
                               errorText={emailErrorText.current}
                               inputIsValid={emailIsValid}
                               />

                    <TextField type={'password'}
                        name={'password'}
                        placeholder={'******'}
                        ref={passwordRef}
                        label={'Password'}
                        errorText={passwordErrorText.current}
                        inputIsValid={passwordIsValid}
                        />

                    <button className={classesLoginButton}
                            type={'button'}
                            onClick={onClickLoginHandler}> LOGIN </button>
                </form>

                <p className={classesParagraph}>or</p>
                <button className={classesSignUpButton}
                        type={'button'}> SIGN UP </button>
            </main>

            {showDialog && <LoadingDialog message={'login...'}/>}
        </motion.div>
    );
}

export default LoginPage;