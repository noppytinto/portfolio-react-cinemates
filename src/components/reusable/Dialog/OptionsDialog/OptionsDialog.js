import ReactDOM from 'react-dom';
import styles from './OptionsDialog.module.scss';
import ActionDialog from '../ActionDialog/ActionDialog';
import {v4 as uuidv4} from 'uuid';
import {useRef} from "react";
import Checkbox from "../../Checkbox/Checkbox";

function OptionsDialog(props) {
    const title = props.title ?? '';
    const items = props.items ?? [];
    const checkedItems = props.checkedItems ?? [];
    const buttonNegativeLabel = props.buttonNegativeLabel ?? 'cancel';
    const buttonPositiveLabel = props.buttonPositiveLabel ?? 'ok';
    const buttonNegativeAction = props.buttonNegativeAction ?? null;
    const buttonPositiveAction = props.buttonPositiveAction ?? null;
    const onClickOutsideAreaHandler = props.onClickOutsideArea;

    let classesDialog = `${styles['dialog']}`;
    let classesContent = `${styles['dialog__content']}`;

    let formRef = useRef();

    let checkedLists = [];


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function spawnItems(items, checkedItems) {

        return items.map((item, i) => {
            if (checkedItems[i]) {
                return (
                    <li key={item}>
                        <Checkbox id={item}
                                  value={item}
                                  onChange={ev => onListChecked(ev, i)}
                                  checked={true}
                        />
                        <label htmlFor={item}>{item}</label>
                    </li>
                )
            }

            return (
                <li key={item}>
                    <Checkbox id={item}
                              value={item}
                              onChange={ev => onListChecked(ev, i)}
                    />
                    <label htmlFor={item}>{item}</label>
                </li>
            )
        })
    }

    function onListChecked(ev, i) {
        checkedItems[i] = ev.target.checked;
    }

    function onClickPositiveButton(ev, checkedItems) {
        buttonPositiveAction?.(ev, checkedItems);
    }

    function onClickNegativeButton(ev, checkedItems) {
        buttonNegativeAction?.(ev, checkedItems);
    }


    //////////////////////////////
    // JSX
    //////////////////////////////
    return ReactDOM.createPortal(
        <ActionDialog className={classesDialog}
                      title={title}
                      buttonNegativeLabel={buttonNegativeLabel}
                      buttonPositiveLabel={buttonPositiveLabel}
                      buttonNegativeAction={ev => onClickNegativeButton(ev, checkedItems)}
                      buttonPositiveAction={ev => onClickPositiveButton(ev, checkedItems)}
                      onClickOutsideArea={onClickOutsideAreaHandler}
        >
            <form ref={formRef}>
                <ul>{spawnItems(items, checkedItems)}</ul>
            </form>
        </ActionDialog>
        , document.getElementById('dialog')
    );

}// OptionsDialog


export default OptionsDialog;