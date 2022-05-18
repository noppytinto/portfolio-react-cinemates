import styles from './Dialog.module.scss';


function Dialog(props) {
    const children = props.children;
    
    let classesDialogContainer = `${styles['dialog-container']}`;
    let classesDialog = `${styles['dialog']} ${props.className}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function onClickOutsideAreaHandler(ev) {
        console.log(ev.target.classList);
        if (ev.target.classList.contains(classesDialogContainer)) 
            props.onClickOuterArea();
    }



    //////////////////////////////
    // JSX
    //////////////////////////////
    return (
        <div className={classesDialogContainer} onClick={onClickOutsideAreaHandler}>
            <div className={classesDialog}>
                {children}
            </div>
        </div>
    );
}// Dialog

export default Dialog;