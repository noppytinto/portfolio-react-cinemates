import { NavLink } from 'react-router-dom';
import OutlineButton from '../../../../reusable/OutlineButton/OutlineButton';
import styles from './ListHeader.module.scss';

function ListHeader({
    title = 'Header', 
    buttonText = 'Button', 
    buttonUrl='', 
    linkData={}}) {

    return (
        <div className={styles['list-header']} >
            <h1 className={styles['list-header__title']}>{title}</h1>

            <NavLink to={buttonUrl} state={linkData}>
                <OutlineButton>{buttonText}</OutlineButton>
            </NavLink>
        </div>
    );
}

export default ListHeader;