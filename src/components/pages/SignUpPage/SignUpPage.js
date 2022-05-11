import styles from './SignUpPage.module.scss';
import * as assets from '../../../utils/assets-manager';
import { NavLink } from 'react-router-dom';
import {authActions} from '../../../redux/slices/auth-slice'
import {useDispatch, useSelector} from "react-redux";
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";


function SignUpPage(props) {
    const classesSignUpPage = `${styles['signup-page']} ${props.className} `;

    const dispatcher = useDispatch();
    const userIsLogged = useSelector((state) => state.authSlice.isLogged);


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////



    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <div className={classesSignUpPage}>
            <HeaderWithBackButton backButtonUrl={'/'} title={'Sign Up'} />
        </div>
    );
}

export default SignUpPage;