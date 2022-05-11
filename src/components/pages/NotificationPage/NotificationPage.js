import styles from './NotificationPage.module.scss';
import HeaderWithBackButton
    from "../../reusable/HeaderWithBackButton/HeaderWithBackButton";

function NotificationPage(props) {
    const classes = `${styles['notification-page']} ${props.className} `;
    return (
        <div className={classes}>
            <HeaderWithBackButton title={'Notifications'} />
        </div>
    );
}

export default NotificationPage;