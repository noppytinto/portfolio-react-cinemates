import {fill} from "@cloudinary/url-gen/actions/resize";
import {Cloudinary} from "@cloudinary/url-gen";
import {
    AdvancedImage,
    accessibility,
    responsive,
    lazyload,
    placeholder
   } from '@cloudinary/react';
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";


let cld = _getCloudinaryInstance(_getCloudinaryData());

function _getCloudinaryData() {
    const data = {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }

    return data;
}

function _getCloudinaryInstance(data) {
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: data.cloudName,
        }
    });
    // console.log(cld);

    return cld
}

function _getCloudinaryImage() {
    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image('80eb5afc-a9f6-487b-b26e-9b05543af17b'); 
    // console.log(myImage);

    return myImage;
}

function _getImageBaseUrl() {
    return `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/`;
}

function _getImageUploadBaseUrl() {
    return `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload/`;
}

export function buildImageUrl(imageName, extension='.jpg') {
    const baseUrl = _getImageBaseUrl();
    return baseUrl + imageName + extension;
}

export function getTransformedImage(imageId) {
    if (!imageId) return null;

    let myImage = null;

    try {
        // fetch image from cloud
        myImage = cld.image(imageId);

        // apply the transformation.
        myImage
            .resize(thumbnail()
                .width(100)
                .height(100)
                .gravity(focusOn(FocusOn.face())))  // Crop the image, focusing on the face.
            .roundCorners(byRadius(100));    // Round the corners.

    } catch (err) {
        console.log('ERROR CLOUDINARY IMAGE: ', err);
    }

    return myImage;
}

export function uploadImage(file, publicId, onSuccess, onFailure) {
    const formData = new FormData();
    const url = _getImageUploadBaseUrl();

    formData.append("file", file);
    formData.append("upload_preset", "qvrfptez");
    formData.append("public_id", publicId);

    const options= {
        method: "POST",
        body: formData
      };

    fetch(url, options)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
            onSuccess(data);
        })
        .catch(err => {
            onFailure(err);
        });
}