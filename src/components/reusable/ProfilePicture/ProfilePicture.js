import styles from './ProfilePicture.module.scss';
import * as assets from "../../../utils/assets-manager";
import {AdvancedImage} from "@cloudinary/react";


function ProfilePicture(props) {
    const src = props.src || null;
    const alt = props.alt || 'profile picture';
    console.log('CLASSES:', props.className);

    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////



    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <>
            { (src) ?
                <AdvancedImage className={ `${styles['profile-picture']} ${props.className}`}
                               cldImg={src}
                               alt={alt}/>
                :
                <div className={`${styles['profile-picture']} ${props.className}`}>
                    <assets.IconPerson className={`${styles['profile-picture__default-icon']}`} />
                </div>
            }
        </>
    );
}// ProfilePicture

export default ProfilePicture;