import styles from './Checkbox.module.scss';
import {useState} from "react";


function Checkbox(props) {
    const id = props.id;
    const value = props.value;
    const onCheckHandler = props.onChange;
    const checked = props.checked ?? false;
    const classes = props.className;
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
        <input id={id}
               className={`${styles.checkbox} ${classes}`}
               type={'checkbox'}
               value={value}
               onChange={onChangeHandler}
               checked={isChecked}
        />
    );
}// Checkbox

export default Checkbox;