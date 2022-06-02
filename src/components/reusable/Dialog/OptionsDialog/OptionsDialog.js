import styles from './OptionsDialog.module.scss';
import ActionDialog from '../ActionDialog/ActionDialog';
import Checkbox from "../../Checkbox/Checkbox";

function OptionsDialog(props) {
    const title = props.title ?? '';
    const items = props.items ?? [];
    const checkedItems = props.checkedItems ?? [];
    const onItemCheckedHandler = props.onItemCheck ?? null;
    const buttonNegativeLabel = props.buttonNegativeLabel ?? 'cancel';
    const buttonPositiveLabel = props.buttonPositiveLabel ?? 'ok';
    const buttonNegativeAction = props.buttonNegativeAction ?? null;
    const buttonPositiveAction = props.buttonPositiveAction ?? null;
    const onClickOutsideHandler = props.onClickOutside;

    let classesDialog = `${styles['dialog']}`;
    let classesContent = `${styles['dialog__content']}`;
    let checkedLists = [];


    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function spawnItems(items, checkedItems) {

        return items.map((item, i) => {
            const isChecked = checkedItems[i];

            return (
                <li key={item}>
                    <Checkbox id={item}
                              value={item}
                              onChange={ev => onItemCheck(ev, i)}
                              checked={isChecked}
                    />
                    <label htmlFor={item}>{item}</label>
                </li>
            )
        })
    }

    function onItemCheck(ev, i) {
        onItemCheckedHandler?.(ev, i, ev.target.checked);
    }

    function onClickPositiveButton(ev) {
        buttonPositiveAction?.(ev);
    }

    function onClickNegativeButton(ev) {
        buttonNegativeAction?.(ev);
    }


    //////////////////////////////
    // JSX
    //////////////////////////////

    return (
        <ActionDialog className={classesDialog}
                      title={title}
                      buttonNegativeLabel={buttonNegativeLabel}
                      buttonPositiveLabel={buttonPositiveLabel}
                      buttonNegativeAction={onClickNegativeButton}
                      buttonPositiveAction={onClickPositiveButton}
                      onClickOutside={onClickOutsideHandler}
        >
            <form>
                <ul>{spawnItems(items, checkedItems)}</ul>
            </form>
        </ActionDialog>
    );

}// OptionsDialog


export default OptionsDialog;