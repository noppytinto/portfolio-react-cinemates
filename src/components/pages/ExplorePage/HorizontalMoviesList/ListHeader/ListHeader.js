import OutlineButton from '../../../../reusable/OutlineButton/OutlineButton';
import styles from './ListHeader.module.css';

function ListHeader({title = 'Header', buttonText = 'Button'}) {

    return (
        <div className={styles['list-header']} >
            <h1 className={styles['list-header__title']}>{title}</h1>
            <OutlineButton>{buttonText}</OutlineButton>
        </div>
    );
}

export default ListHeader;