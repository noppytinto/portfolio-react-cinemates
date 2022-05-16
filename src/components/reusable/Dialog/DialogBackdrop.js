import ReactDOM from 'react-dom';
import styles from './DialogBackdrop.module.scss';


function DialogBackdrop(props) {
    let classesDialogBackdrop = `${styles['dialog-backdrop']}`;


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function onClickHandler(ev) {
        ev.preventDefault();
        console.log('outer area clicked');
    }



    //////////////////////////////
    // JSX
    //////////////////////////////
    const dialogBackdrop = (
        <div className={classesDialogBackdrop} onClick={onClickHandler}>asd</div>
    );
    return ReactDOM.createPortal(dialogBackdrop, document.getElementById('dialog-backdrop'));
}// DialogBackdrop

export default DialogBackdrop;