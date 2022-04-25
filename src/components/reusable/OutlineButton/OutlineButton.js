import styles from './OutlineButton.module.css';

function OutlineButton(props) {
    const textContent = props.children ?? 'BUTTON';

    function clickHandler(ev) {
        props.onClick?.(ev);
    }


    return (
        <button className={`${styles['outline-button']} disable-select`} 
        type="button"
        onClick={clickHandler} 
        >
            {textContent}
        </button>
    );
}

export default OutlineButton;