import styles from './ProfilePicture.module.scss';
import * as assets from "../../../utils/assets-manager";
import {AdvancedImage} from "@cloudinary/react";
import * as cloudinaryService from "../../../services/cloudinary-service";
import React, {useEffect, useState} from "react";


function _propsAreEqual(prev, next) {
    console.log('props are equal');
    return prev.imageId === next.imageId;
}

const ProfilePicture = React.memo((props) => {
    console.log('profile image rendered');
    const imageId = props.imageId || null;
    const alt = props.alt || '';
    const src = props.src || '';
    const [cloudinaryImage, setCloudinaryImage] = useState(null);


    //////////////////////////////////////
    // EFFECTS
    //////////////////////////////////////
    useEffect(() => {
        if(!imageId) return;

        setCloudinaryImage(cloudinaryService.getTransformedImage(imageId));
    }, [imageId, setCloudinaryImage])


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <>
            { (imageId) ?
                <AdvancedImage className={ `${styles['profile-picture']} ${props.className}`}
                               cldImg={cloudinaryImage}
                               alt={alt}/>
                :
                ((src) ?
                    <img className={`${styles['profile-picture']} ${props.className}`}
                         src={src} alt={alt}/>
                    :
                    <div className={`${styles['profile-picture']} ${props.className}`}>
                        <assets.IconPerson className={`${styles['profile-picture__default-icon']}`} />
                    </div>
                )
            }
        </>
    );
}, _propsAreEqual);// ProfilePicture



export default ProfilePicture;