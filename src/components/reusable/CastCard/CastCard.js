import styles from './CastCard.module.scss';
import * as assets from '../../../utils/assets-manager';

function CastCard({
        className,
        imageUrl=assets.iconBrokenImage,
        alt='', 
        name='',}
    ) {

    let classes = `${styles['cast-card']} ${className} `;
    let containerImageClasses = `${styles['cast-card__container-img']}`;
    let imageClasses = `${styles['cast-card__img']}`;
    let containerCastNameClasses = `${styles['cast-card__container-name']}`;
    let castNameClasses = `${styles['cast-card__name']}`;

    return (
        <div className={classes} >
            <div className={containerImageClasses} >
                <img className={imageClasses}
                     src={imageUrl || assets.iconBrokenImage}
                     alt={alt}
                     draggable={'false'}
                     loading={'lazy'}/>
            </div>

            <div className={containerCastNameClasses}>
                <p className={castNameClasses}>{name}</p>
            </div>
        </div>
    );
}// CastCard

export default CastCard;