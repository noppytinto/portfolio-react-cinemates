import styles from './EditableProfilePicture.module.scss';
import * as assets from "../../../../utils/assets-manager";
import React, {useRef, useState} from "react";
import ProfilePicture from "../ProfilePicture";


const EditableProfilePicture = React.forwardRef((props, forwardRef) => {
    const onChange = props.onChange ?? (()=>{});
    const imageId = props.imageId;
    const showPreviewFile = props.showPreview ?? false;
    const [previewFile, setPreviewFile] = useState();


    //////////////////////////////////////
    // EFFECTS
    //////////////////////////////////////



    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function handleOnChangeUploadPhoto(ev) {
        const file = ev.target.files[0];
        console.log('local file:', file);

        onChange(ev, file);

        if (!file) return;
        setPreviewFile(URL.createObjectURL(file));
    }

    function handleOnClickEdit(ev) {
        console.log('edit button');
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <div className={`${styles['editable-profile-picture']}`}>

            {(showPreviewFile) ?
                <ProfilePicture className={ `${styles['editable-profile-picture__image']} 
                                             ${styles['editable-profile-picture__image--preview']} 
                                             ${props.className}`}
                                src={previewFile}
                                alt={'preview'} />
                :
                <ProfilePicture className={ `${styles['editable-profile-picture__image']} ${props.className}`}
                                imageId={imageId}/>
            }


            <form method="post" encType="multipart/form-data">
                <label onClick={handleOnClickEdit} className={`${styles['editable-profile-picture__btn-edit-photo']}`} htmlFor="upload-photo">
                    <assets.IconEdit  className={`${styles['editable-profile-picture__edit-icon']}`}/>
                </label>
                <input className={'hidden'}
                       id={"upload-photo"}
                       type={'file'}
                       name={'photoFile'}
                       ref={forwardRef}
                       onChange={handleOnChangeUploadPhoto}></input>
            </form>
        </div>
    );
});// EditableProfilePicture

export default EditableProfilePicture;