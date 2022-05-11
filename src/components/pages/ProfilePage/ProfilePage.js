import styles from './ProfilePage.module.scss';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../redux/slices/auth-slice";
import {useNavigate} from "react-router-dom";
import * as authService from '../../../services/auth-service';


function ProfilePage(props) {
    const classesProfilePage = `${styles['profile-page']}`;
    const classesMain = `${styles['profile-page__main']}`;
    const classesLabel = `${styles['profile-page__label']}`;
    const classesLogoutButton = `${styles['profile-page__btn-option']} ${styles['profile-page__btn-logout']}`;

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const userIsLogged = useSelector((state) => state.authSlice.isLogged);


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function onClickLogoutHandler(ev) {
        ev.preventDefault();
        if (!userIsLogged) return;

        authService.logout(() => {
            console.log('LOGOUT SUCCESSFUL');
            dispatcher(authActions.setIsLogged({isLogged: false}));
            navigate('/');
        }, (errorCode, errorMessage) => {
            console.log('LOGOUT FAIL');
            console.log('error code:', errorCode);
            console.log('error message:', errorMessage);
        });
    }



    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <div className={classesProfilePage}>
            <HeaderWithBackButton backTo={'/'} title={'Profile'} />

            <main className={classesMain}>
                <h2 className={classesLabel}>Settings</h2>

            </main>

            <button className={classesLogoutButton}
                    onClick={onClickLogoutHandler}>
                logout
            </button>
        </div>
    );
}

export default ProfilePage;