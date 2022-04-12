import styles from './PlaceholderPage.module.css';

function PlaceholderPage(props) {
    return (
        <div className={styles['placeholder-page']}>
            {props.children}
        </div>
    );
}

export default PlaceholderPage;