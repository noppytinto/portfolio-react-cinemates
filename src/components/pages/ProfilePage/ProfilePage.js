import styles from './ProfilePage.module.scss';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../redux/slices/auth-slice";
import {useNavigate} from "react-router-dom";
import * as authService from '../../../services/auth-service';
import * as cloudinaryService from '../../../services/cloudinary-service';
import { AdvancedImage } from '@cloudinary/react';
import * as assets from '../../../utils/assets-manager';
import * as utils from '../../../utils/utils';

function ProfilePage(props) {
    const classesHeader = `${styles['header']}`;
    const classesProfilePage = `${styles['profile-page']}`;
    const classesMain = `${styles['profile-page__main']}`;
    const classesUserData = `${styles['profile-page__user-data']}`;
    const classesProfileImage = `${styles['profile-page__profile-image']}`;
    const classesUsername = `${styles['profile-page__profile-username']}`;
    const classesLists = `${styles['profile-page__lists']}`;
    const classesSettings = `${styles['profile-page__settings']}`;
    const classesLabel = `${styles['profile-page__label']}`;
    const classesLogoutButton = `${styles['profile-page__btn-option']} ${styles['profile-page__btn-logout']}`;

    const userData = useSelector(state => state.authSlice.userData);
    const isLogged = useSelector(state => state.authSlice);
    console.log(isLogged);
    const username = userData?.username ?? '';
    const imageId = userData?.imageId ?? '';
    const profileImage = cloudinaryService.getTransformedImage(imageId);
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
            <HeaderWithBackButton className={classesHeader} 
                                  backTo={assets.pathRoot} 
                                  title={assets.stringPersonalProfile} />

            <main className={classesMain}>
                <section className={classesUserData}>
                    <AdvancedImage className={classesProfileImage}
                                   cldImg={profileImage} 
                                   alt={assets.stringAltProfilePicture} />
                    <p className={classesUsername}>{'@' + username}</p>

                </section>

                <section className={classesLists}>
                    <h2 className={classesLabel}> {utils.capitalizeFirstLetter(assets.stringLists)} </h2>

                </section>
            </main>

            <footer className={classesSettings}>
                <h2 className={classesLabel}> {utils.capitalizeFirstLetter(assets.stringSettings)} </h2>
                <button className={classesLogoutButton}
                        onClick={onClickLogoutHandler}> {assets.stringLogout} </button>
            </footer>

        </div>
    );

}// ProfilePage

export default ProfilePage;