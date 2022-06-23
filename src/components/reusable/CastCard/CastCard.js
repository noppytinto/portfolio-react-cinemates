import styles from './CastCard.module.scss';
import * as assets from '../../../utils/assets-manager';

function CastCard(props) {
    let imageUrl=  props.imageUrl || '';
    const alt = props.alt || '';
    const name = props.name || '';

    let classesImage = `${styles['cast-card__img']} `;

    if (!imageUrl) {
       imageUrl = assets.iconBrokenImage;
       classesImage = `${styles['cast-card__img']} ${styles['cast-card__img--broken']}`
    }

    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <div className={`${styles['cast-card']} ${props.className} `} >
            <img className={classesImage}
                 src={imageUrl}
                 alt={alt}
                 draggable={'false'}
                 loading={'lazy'}
                 data-testid={'image'}
            />

            <p className={`${styles['cast-card__name']}`} data-testid={'name'}>{name}</p>
        </div>
    );
}// CastCard

export default CastCard;