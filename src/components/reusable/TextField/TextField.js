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
    
    let classesTextField = inputIsValid ? 
        `${styles['textfield']} ${props.className}` :
        `${styles['textfield']} ${props.className} ${styles['textfield--error']}`;
    const classesContainer = `${styles['textfield-container']}`;
    const classesLabel = `${styles['textfield__label']}`;
    // const classesIcon = `${styles['textfield__icon']}`;
    const classesHelperText = `${styles['textfield__helper-text']}`;
    const classesErrorText = `${styles['textfield__error-text']}`;
    

    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////



    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <div className={classesContainer}>
            <label className={classesLabel} htmlFor={name}>{label}</label>
            <input id={name}
                   className={classesTextField}
                   type={type}
                   name={name}
                   placeholder={placeholder}
                   onChange={onChangeHandler}
                   value={value}
                   ref={ref} />

            {inputIsValid ? 
                <p className={classesHelperText}>{helperText}</p> :
                <p className={classesErrorText}>{errorText}</p>
            }
            
        </div>

            
    );
})// TextField

export default TextField;