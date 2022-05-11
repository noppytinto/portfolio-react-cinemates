import styles from './ProfilePage.module.scss';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {useDispatch, useSelector} from "react-redux";

function ProfilePage(props) {
    const classesProfilePage = `${styles['profile-page']}`;
    const classesMain = `${styles['profile-page__main']}`;
    const classesLabel = `${styles['profile-page__label']}`;
    const classesLogoutButton = `${styles['profile-page__btn-option']} ${styles['profile-page__btn-logout']}`;

    const dispatcher = useDispatch();
    const userIsLogged = useSelector((state) => state.authSlice.isLogged);


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////



    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <div className={classesProfilePage}>
            <HeaderWithBackButton backButtonUrl={'/'} title={'Profile'} />

            <main className={classesMain}>
                <h2 className={classesLabel}>Settings</h2>

            </main>

            <button className={classesLogoutButton}>
                logout
            </button>
        </div>
    );
}

export default ProfilePage;