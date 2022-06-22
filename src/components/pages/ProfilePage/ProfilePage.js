import styles from './ProfilePage.module.scss';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../redux/slices/auth-slice";
import {useNavigate} from "react-router-dom";
import * as authService from '../../../services/auth-service';
import * as cloudinaryService from '../../../services/cloudinary-service';
import {AdvancedImage} from '@cloudinary/react';
import * as assets from '../../../utils/assets-manager';
import {useEffect, useRef, useState} from "react";
import ActionDialog from "../../reusable/Dialog/ActionDialog/ActionDialog";
import ListButton from '../../reusable/ListButton/ListButton';
import {IconLogout} from '../../../utils/assets-manager';
import {motion} from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import * as userDao from '../../../dao/user-dao';


function ProfilePage(props) {
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const userData = useSelector(state => state.authSlice.userData);
    const [profileImage, setProfileImage] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [showConfirmationPhoto, setShowConfirmationPhoto] = useState(false);
    // const [showEditPhoto, setShowEditPhoto] = useState(false);
    // const [newProfileImage, setShowEditPhoto] = useState(false);
    const formRef = useRef();
    const fileRef = useRef(null);

    const username = userData?.username ?? '';
    const movieLists = userData?.lists ?? {};
    const oldImageId = userData?.imageId ?? '';


    /////////////////////////////
    // EFFECTS
    /////////////////////////////
    useEffect(() => {
        const transformedImage = cloudinaryService.getTransformedImage(oldImageId);
        setProfileImage(transformedImage);
    }, [oldImageId, setProfileImage]);


    /////////////////////////////
    // FUNCTIONS
    /////////////////////////////
    function onClickLogoutHandler(ev) {
        ev.preventDefault();
        setShowConfirmationDialog(true);
    }

    function onClickPositiveButtonHandler(ev) {
        authService.logout(() => {
            console.log('LOGOUT SUCCESSFUL');
            dispatcher(authActions.setIsLogged({isLogged: false}));
            dispatcher(authActions.setUserData({}));
            navigate('/');
        }, (errorCode, errorMessage) => {
            console.log('LOGOUT FAIL');
            console.log('error code:', errorCode);
            console.log('error message:', errorMessage);
        });
    }

    function onClickNegativeButtonHandler(ev) {
        setShowConfirmationDialog(false);
    }

    function handleOnClickUploadYes(ev) {
        const newImageId = uuidv4();
        cloudinaryService.uploadImage(fileRef.current, `${newImageId}`, (data) => {
            console.log('UPLOAD SUCCESSFUL: ',  data);
            userDao.updateProfilePicture(newImageId);
            dispatcher(authActions.updateProfilePicture({imageId: newImageId}))


        }, (err) => {
            console.log('UPLOAD FAILED: ',  err);
        });
        setShowConfirmationPhoto(false);
    }

    function handleOnClickUploadNo(ev) {
        if (!showConfirmationPhoto) return;

        setShowConfirmationPhoto(false);
    }

    function handleOnClickEdit(ev) {
        console.log('edit button');
    }

    function handleOnChangeUploadPhoto(ev) {
        // TODO: show thumbnail
        
        fileRef.current = ev.target.files[0];
        console.log('local file:', fileRef.current);

        //if (!fileRef?.current) return;

        setShowConfirmationPhoto(true);
    }


    /////////////////////////////
    // JSX
    /////////////////////////////
    return (
        <>
            <motion.div className={`${styles['profile-page']}`}
                        initial="hidden"
                        animate="visible"
                        variants={props.variants}>

                <HeaderWithBackButton className={`${styles['header']}`}
                                      backTo={assets.pathRoot}
                                      title={assets.stringPersonalProfile}/>

                <main className={`${styles['profile-page__main']}`}>
                    <section className={`${styles['profile-page__user-data']}`}>
                        <div className={`${styles['profile-page__profile-image-container']}`}>
                            <AdvancedImage className={ `${styles['profile-page__profile-image']}`}
                                           cldImg={profileImage}
                                           alt={assets.stringAltProfilePicture}/>

                            <form ref={formRef} method="post" encType="multipart/form-data">
                                <label onClick={handleOnClickEdit} className={`${styles['profile-page__btn-edit-photo']}`} htmlFor="upload-photo">
                                    <assets.IconEdit  className={`${styles['profile-page__edit-icon']}`}/>
                                </label>
                                <input className={'hidden'} 
                                       id={"upload-photo"} 
                                       type={'file'} 
                                       name={'photoFile'} 
                                       onChange={handleOnChangeUploadPhoto}></input>
                            </form>
                        </div>

                        {showConfirmationPhoto && 
                            <div className={`${styles['profile-page__photo-confirmation']}`}>
                                <p className={`${styles['profile-page__confirmation-message']}`}>update photo?</p>
                                <div className={`${styles['profile-page__confirmation-buttons']}`}>
                                    <button  className={`${styles['profile-page__confirmation-button']} ${styles['profile-page__confirmation-button--yes']}`}
                                             onClick={handleOnClickUploadYes}>
                                        YES</button>
                                    <button  className={`${styles['profile-page__confirmation-button']} ${styles['profile-page__confirmation-button--no']}`}
                                             onClick={handleOnClickUploadNo}>
                                        NO</button>
                                </div>
                            </div>
                        }

          
                        <p className={`${styles['profile-page__profile-username']}`}>{'@' + username}</p>
      

                    </section>

                    <section className={`${styles['profile-page__lists']}`}>
                        <h2 className={`${styles['profile-page__label']} ${styles['profile-page__label-list']}`}> {assets.stringLists} </h2>

                        <ListButton className={`${styles['profile-page__list-button']}`} 
                                    movies={movieLists.watchlist} listName={'watchlist'} title={'Watchlist'} titleColor={'rgb(255, 0, 0)'}/>
                        <ListButton className={`${styles['profile-page__list-button']}`} 
                                    movies={movieLists.favorites} listName={'favorites'} title={'Favorites'} titleColor={'#fed23f'} />
                        <ListButton className={`${styles['profile-page__list-button']}`} 
                                    movies={movieLists.watched} listName={'watched'} title={'Watched'} titleColor={'rgb(0, 173, 14)'} />
                    </section>
                </main>

                <footer className={`${styles['profile-page__settings']}`}>
                    <h2 className={`${styles['profile-page__label']} ${styles['profile-page__label-settings']}`}> {assets.stringSettings} </h2>
                    <button className={`${styles['profile-page__btn-option']}`}
                            onClick={onClickLogoutHandler}> 
                                <IconLogout />
                                <p>{assets.stringLogout}</p>
                    </button>
                </footer>

            </motion.div>

            {showConfirmationDialog && 
                <ActionDialog buttonNegativeAction={onClickNegativeButtonHandler}
                              buttonPositiveAction={onClickPositiveButtonHandler}
                              onClickOutside={onClickNegativeButtonHandler}>
                    <p>Are you sure you want to logout?</p>
                </ActionDialog>}
        </>

    );

}// ProfilePage

export default ProfilePage;