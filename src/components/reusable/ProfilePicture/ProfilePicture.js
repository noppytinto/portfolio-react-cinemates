import styles from './ProfilePicture.module.scss';
import * as assets from "../../../utils/assets-manager";
import {AdvancedImage} from "@cloudinary/react";
import * as cloudinaryService from "../../../services/cloudinary-service";
import {useEffect, useState} from "react";


function ProfilePicture(props) {
    const imageId = props.imageId || null;
    const alt = props.alt || 'profile picture';
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
}// ProfilePicture

export default ProfilePicture;