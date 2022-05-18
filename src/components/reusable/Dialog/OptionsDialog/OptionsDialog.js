import ReactDOM from 'react-dom';
import styles from './OptionsDialog.module.scss';
import ActionDialog from '../ActionDialog/ActionDialog';
import { v4 as uuidv4 } from 'uuid';


function OptionsDialog(props) {
    const title = props.title ?? '';
    const lists = props.lists ?? [];
    // const message = props.message ?? 'message';
    const buttonLeftLabel = props.buttonLeftLabel ?? 'button 1';
    const buttonRightLabel = props.buttonRightLabel ?? 'button 2';
    const buttonLeftAction = props.buttonLeftAction ?? null;
    const buttonRightAction = props.buttonRightAction ?? null;
    const onClickOutsideAreaHandler = props.onClickOutsideArea;

    let classesDialog = `${styles['dialog']}`;
    let classesContent = `${styles['dialog__content']}`;



    //////////////////////////////
    // FUNCTIONS
    //////////////////////////////
    function spawnLists(lists) {
        return (
            <form>
                <ul>
                    {lists.map(list => {
                        const id = uuidv4();
                        return (
                            <li key={id} >
                                <input id={id} type={'checkbox'} value={list} />
                                <label htmlFor={id}>{list}</label>
                            </li>
                        )
                    })}
                </ul>
            </form>
        );
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
                      buttonLeftAction={buttonLeftAction}
                      buttonRightAction={buttonRightAction}
                      >
            {spawnLists(lists)}
        </ActionDialog>
    );
    return ReactDOM.createPortal(dialog, document.getElementById('dialog'));

}// OptionsDialog


export default OptionsDialog;