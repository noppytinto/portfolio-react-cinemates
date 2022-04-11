import styles from './OutlineButton.module.css';

function OutlineButton(props) {
    const textContent = props.children ?? 'BUTTON';

    return (
        <button className={`${styles['outline-button']} disable-select`} type="button">
            {textContent}
        </button>
    );
}

export default OutlineButton;