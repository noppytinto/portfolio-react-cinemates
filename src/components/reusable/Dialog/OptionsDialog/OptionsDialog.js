import ReactDOM from 'react-dom';
import styles from './OptionsDialog.module.scss';
import ActionDialog from '../ActionDialog/ActionDialog';
import { v4 as uuidv4 } from 'uuid';
import {useRef} from "react";


function OptionsDialog(props) {
    const title = props.title ?? '';
    const lists = props.lists ?? [];
    const movieId = props.movieId ?? null;
    // const message = props.message ?? 'message';
    const buttonLeftLabel = props.buttonLeftLabel ?? 'button 1';
    const buttonRightLabel = props.buttonRightLabel ?? 'button 2';
    const buttonLeftAction = props.buttonLeftAction ?? null;
    const buttonRightAction = props.buttonRightAction ?? null;
    const onClickOutsideAreaHandler = props.onClickOutsideArea;

    let classesDialog = `${styles['dialog']}`;
    let classesContent = `${styles['dialog__content']}`;

    let formRef = useRef();

    let checkedLists = [];


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function spawnLists(lists, movieId) {
        const views = [];

        for (const [key, list] of Object.entries(lists)) {
            const listName = key;

            if (list.includes(movieId)) {
                checkedLists.push(key);
                views.push(
                    <li key={listName} >
                        <input id={listName}
                               type={'checkbox'}
                               value={listName}
                               onChange={ev => onListChecked(ev, listName)}
                               checked={true}
                        />
                        <label htmlFor={listName}>{listName}</label>
                    </li>
                )
            }
            else {
                views.push(
                    <li key={listName} >
                        <input id={listName}
                               type={'checkbox'}
                               value={listName}
                               onChange={ev => onListChecked(ev, listName)}
                        />
                        <label htmlFor={listName}>{listName}</label>
                    </li>
                )
            }
        }
        return views;
    }

    function onListChecked(ev, list) {
        console.log(`list: ${list}`);
        ev.target.checked ? checkedLists.push(list) : (removeItem(checkedLists, list));
        console.log(checkedLists);
    }

    function removeItem(arr, value) {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    function onClickRightButton() {
        console.log(formRef.current);
        buttonRightAction?.();
    }

    function onClickLeftButton() {
        console.log(formRef.current);
        buttonLeftAction?.();
    }


    //////////////////////////////
    // JSX
    //////////////////////////////
    const dialog = (
        <ActionDialog className={classesDialog} 
                      title={title}
                      onClickOutsideArea={onClickOutsideAreaHandler}
                      buttonLeftLabel={buttonLeftLabel}
                      buttonRightLabel={buttonRightLabel}
                      buttonLeftAction={onClickLeftButton}
                      buttonRightAction={onClickRightButton}
                      >
            <form ref={formRef}>
                <ul>{spawnLists(lists, movieId)}</ul>
            </form>
        </ActionDialog>
    );
    return ReactDOM.createPortal(dialog, document.getElementById('dialog'));

}// OptionsDialog


export default OptionsDialog;