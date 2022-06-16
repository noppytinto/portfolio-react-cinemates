import styles from './RoundButton.module.scss';


function RoundButton(props) {


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function handleClick(ev) {
        props.onClick?.(ev);
    }

    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <button className={`${styles['round-button']} ${props.className}`}
                type={props.type ?? 'button'}
                onClick={handleClick}>
            <div className={`${styles['round-button__icon']}`}>
                {props.icon}
            </div>
        </button>
    );
}// RoundButton


export default RoundButton;
