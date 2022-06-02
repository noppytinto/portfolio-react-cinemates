import styles from './Checkbox.module.scss';
import {useState} from "react";


function Checkbox(props) {
    const id = props.id;
    const value = props.value;
    const label = props.label;
    const onCheckHandler = props.onChange;
    const checked = props.checked ?? false;
    const givenClasses = props.className;
    const [isChecked, setIsChecked] = useState(checked);

    ////////////////////////////////////
    // FUNCTIONS
    ////////////////////////////////////

    function onChangeHandler(ev) {
        setIsChecked(!isChecked);
        onCheckHandler?.(ev);
    }


    ////////////////////////////////////
    // JSX
    ////////////////////////////////////
    return (
        <div className={`${styles.checkbox} ${givenClasses}`}>
            <input id={id}
                   className={`${styles['checkbox__check']}`}
                   type={'checkbox'}
                   value={value}
                   onChange={onChangeHandler}
                   checked={isChecked}
            />
            <label className={styles['checkbox__label']} htmlFor={id}>{label}</label>
        </div>
    );
}// Checkbox

export default Checkbox;