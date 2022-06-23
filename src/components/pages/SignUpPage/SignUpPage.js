import styles from './SignUpPage.module.scss';
import React, { useRef, useState } from 'react';
import * as authService from '../../../services/auth-service';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import TextField from '../../reusable/TextField/TextField';
import { useNavigate } from 'react-router-dom';
import LoadingDialog from '../../reusable/Dialog/LoadingDialog/LoadingDialog';
import {motion} from 'framer-motion';
import Snackbar from '../../../my-packages/snackbar-system/Snackbar';
import * as userDao from '../../../dao/user-dao';
import EditableProfilePicture
    from "../../reusable/ProfilePicture/EditableProfilePicture/EditableProfilePicture";
import * as cloudinaryService from '../../../services/cloudinary-service';
import {authActions} from "../../../redux/slices/auth-slice";
import {v4 as uuidv4} from "uuid";


function SignUpPage(props) {
    const classesSignUpPage = `${styles['signup-page']} ${props.className} `;

    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [repeatPasswordIsValid, setRepeatPasswordIsValid] = useState(true);
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showPreview, setShowPreview] = useState(true);

    const navigate = useNavigate();

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const repeatPasswordRef = useRef('');
    const usernameRef = useRef('');
    const inputFormRef = React.createRef();
    const fileRef = useRef(null);

    const emailErrorText = useRef('');
    const passwordErrorText = useRef('');
    const repeatPasswordErrorText = useRef('');
    const usernameErrorText = useRef('');
    const snackbarMessage = useRef('');


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function handleOnClickSignup(ev) {
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;
        const repeatPass = repeatPasswordRef.current.value;
        const username = usernameRef.current.value;

        if (! validateInput(email, pass, repeatPass, username)) return;

        setShowDialog(true);
        authService.createUserAccount(email.trim(), pass.trim(), async (user) => {
            console.log('SIGNUP SUCCESSFUL:', user);
            let newImageId = '';

            if (fileRef?.current) {
                newImageId = uuidv4();
            }

            try {
                await userDao.createUser(user.uid, email.trim(), username.trim(), newImageId);

                if (fileRef?.current) {
                    cloudinaryService.uploadImage(fileRef.current, `${newImageId}`, (data) => {
                        console.log('UPLOAD SUCCESSFUL: ',  data);
                    }, (err) => {
                        console.log('UPLOAD FAILED: ',  err);
                    });
                }

                navigate('/login');

            } catch(e) {
                console.log('SIGNUP ERROR: ', e);
                setShowDialog(false);
                snackbarMessage.current = e;
                setShowSnackbar(true);
            }

        }, (errorCode, errorMessage) => {
            setShowDialog(false);
            processErrorCodes(errorCode, errorMessage);
        })
    }

    function validateInput(email, password, repeatPassword, username) {
        let isValid = true;

        if (!email.trim()) {
            emailErrorText.current = 'empty field';
            setEmailIsValid(false);
            isValid = false;
        }
        else setEmailIsValid(true);
        

        if (!password.trim()) {
            passwordErrorText.current = 'empty field';
            setPasswordIsValid(false);
            isValid = false;
        }
        else setPasswordIsValid(true);
        
        const repeat = repeatPassword.trim();
        if (!repeat.trim()) {
            repeatPasswordErrorText.current = 'empty field';
            setRepeatPasswordIsValid(false);
            isValid = false;
        }
        else {
            const pass = password.trim();
            if (pass !== repeat) {
                repeatPasswordErrorText.current = 'passwords do not match';
                setRepeatPasswordIsValid(false);
                isValid = false;
            }
            else setRepeatPasswordIsValid(true);
        }

        if (!username.trim()) {
            usernameErrorText.current = 'empty field';
            setUsernameIsValid(false);
            isValid = false;
        }
        else setUsernameIsValid(true);
        

        return isValid;
    }

    function processErrorCodes(errorCode, errorMessage) {
        console.log('LOGIN FAIL');
        console.log('error code:', errorCode);
        console.log('error message:', errorMessage);
        snackbarMessage.current = errorMessage;
        setShowSnackbar(true);

        // TODO: process error codes
        // switch(errorCode) {
        //     case 'auth/invalid-email': 
        //         emailErrorText.current = 'invalid email';
        //         setEmailIsValid(false);
        //         setPasswordIsValid(true);
        //         break;
        //     case 'auth/user-not-found': 
        //         emailErrorText.current = 'user not found';
        //         passwordErrorText.current = 'user not found';
        //         setEmailIsValid(false);
        //         setPasswordIsValid(false);
        //         break;
        //     case 'auth/wrong-password': 
        //         passwordErrorText.current = 'wrong password';
        //         setEmailIsValid(true);
        //         setPasswordIsValid(false);
        //         break;
        //     case 'auth/too-many-requests': 
        //         emailErrorText.current = 'too many requests, temporary blocked';
        //         passwordErrorText.current = 'too many requests, temporary blocked';
        //         setEmailIsValid(false);
        //         setPasswordIsValid(false);
        //         break;
        //     default: 
        //         emailErrorText.current = 'internal error';
        //         passwordErrorText.current = 'internal error';
        //         setEmailIsValid(false);
        //         setPasswordIsValid(false);
        // }
    }

    function handleSnackbar(ev) {
        setShowSnackbar(false);
    }

    function handleOnChangeUploadPhoto(ev, file) {
        if (!file) return;

        fileRef.current = file;
        // setShowConfirmationPhoto(true);
        setShowPreview(true);
    }

    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <motion.div className={classesSignUpPage}
                    initial="hidden"
                    animate="visible"
                    variants={props.variants} >

            <HeaderWithBackButton className={`${styles['header']}`} title={'Sign Up (work in progress)'} />

            <section className={`${styles['signup-page__welcome']}`}>
                <h1 className={`${styles['signup-page__title']}`}>
                    Welcome to <span className={`${styles['signup-page__app-name']}`}>Cinemates</span>
                </h1>
                <p className={`${styles['signup-page__subtitle']}`}>Create a new account to unlock the full experience.</p>
            </section>

            <form className={`${styles['signup-page__form']}`}>
                <EditableProfilePicture className={`${styles['signup-page__profile-image']}`}
                                        onChange={handleOnChangeUploadPhoto}
                                        ref={inputFormRef}
                                        showPreview={showPreview}/>

                <TextField className={`${styles['signup-page__textfield']}`}
                           type={'email'}
                           name={'signupEmail'}
                           placeholder={'user@mail.com'}
                           ref={emailRef}
                           label={'Email'}
                           errorText={emailErrorText.current}
                           inputIsValid={emailIsValid}/>

                <TextField className={`${styles['signup-page__textfield']}`}
                           type={'password'}
                           name={'signupPassword'}
                           placeholder={'******'}
                           ref={passwordRef}
                           label={'Password'}
                           errorText={passwordErrorText.current}
                           inputIsValid={passwordIsValid}/>

                <TextField className={`${styles['signup-page__textfield']}`}
                           type={'password'}
                           name={'signupRepeatPassword'}
                           placeholder={'******'}
                           ref={repeatPasswordRef}
                           label={'Repeat Password'}
                           errorText={repeatPasswordErrorText.current}
                           inputIsValid={repeatPasswordIsValid}/>
                
                
                <TextField className={`${styles['signup-page__textfield']}`}
                           type={'text'}
                           name={'signupUsername'}
                           placeholder={'foo'}
                           ref={usernameRef}
                           label={'@username'}
                           errorText={usernameErrorText.current}
                           inputIsValid={usernameIsValid}/>

                <button className={`${styles['signup-page__btn-signup']}`}
                        type={'button'}
                        onClick={handleOnClickSignup}> SIGNUP </button>
            </form>

            {showDialog && <LoadingDialog message={'signing up...'}/>}
            {showSnackbar && <Snackbar text={snackbarMessage.current}
                                    actionLabel={'ok'}
                                    onClickAction={handleSnackbar}/>}
        </motion.div>

    );
}// SignUpPage

export default SignUpPage;