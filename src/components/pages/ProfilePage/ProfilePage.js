import styles from './ProfilePage.module.scss';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../redux/slices/auth-slice";
import {useNavigate} from "react-router-dom";
import * as authService from '../../../services/auth-service';


function ProfilePage(props) {
    const classesHeader = `${styles['header']}`;
    const classesProfilePage = `${styles['profile-page']}`;
    const classesMain = `${styles['profile-page__main']}`;
    const classesUserData = `${styles['profile-page__user-data']}`;
    const classesLists = `${styles['profile-page__lists']}`;
    const classesSettings = `${styles['profile-page__settings']}`;
    const classesLabel = `${styles['profile-page__label']}`;
    const classesLogoutButton = `${styles['profile-page__btn-option']} ${styles['profile-page__btn-logout']}`;

    const userData = props.userData;
    // const username = userData.username;
    // const profileImageUrl = userData.profileImageUrl;
    // const email = userData.email;

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
            <HeaderWithBackButton className={classesHeader} backTo={'/'} title={'Profile'} />

            <main className={classesMain}>
                <section className={classesUserData}>
                    {/* <img src={} alt={}></img> */}
                </section>
                <section className={classesLists}></section>
            </main>

            <footer className={classesSettings}>
                <h2 className={classesLabel}>Settings</h2>
                <button className={classesLogoutButton}
                        onClick={onClickLogoutHandler}> logout </button>
            </footer>

        </div>
    );

}// ProfilePage

export default ProfilePage;