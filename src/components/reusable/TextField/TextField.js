import React from 'react';
import styles from './TextField.module.scss';


const TextField = React.forwardRef((props, ref) => {
    const label = props.label;
    const onChangeHandler = props.onChange;
    const value = props.onChange;
    const type = props.type ?? 'text';
    const name = props.name ?? null;
    const placeholder = props.placeholder ?? '';
    const helperText = props.helperText ?? '';
    const errorText = props.errorText ?? '';
    const inputIsValid = props.inputIsValid ?? true;
    
    const classesTextField = inputIsValid ?
        `${styles['textfield']} ` :
        `${styles['textfield']} ${styles['textfield--error']}`;
    // const classesIcon = `${styles['textfield__icon']}`;


    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <div className={`${styles['textfield-container']} ${props.className}`}>
            <label className={`${styles['textfield__label']}`} htmlFor={name}>{label}</label>
            <input id={name}
                   className={classesTextField}
                   type={type}
                   name={name}
                   placeholder={placeholder}
                   onChange={onChangeHandler}
                   value={value}
                   ref={ref} />

            {inputIsValid ? 
                <p className={`${styles['textfield__helper-text']}`}>{helperText}</p> :
                <p className={`${styles['textfield__error-text']}`}>{errorText}</p>
            }
            
        </div>

            
    );
})// TextField

export default TextField;