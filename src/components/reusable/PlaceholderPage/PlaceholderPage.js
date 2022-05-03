import styles from './PlaceholderPage.module.scss';

function PlaceholderPage(props) {
    return (
        <div className={styles['placeholder-page']}>
            {props.children}
        </div>
    );
}

export default PlaceholderPage;