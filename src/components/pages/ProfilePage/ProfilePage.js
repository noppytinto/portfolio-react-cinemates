import styles from './ProfilePage.module.css';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";

function ProfilePage(props) {
    const classes = `${styles['profile-page']} ${props.className} `;
    return (
        <div className={classes}>
            <HeaderWithBackButton backButtonUrl={'/'} title={'Profile'} />
        </div>
    );
}

export default ProfilePage;