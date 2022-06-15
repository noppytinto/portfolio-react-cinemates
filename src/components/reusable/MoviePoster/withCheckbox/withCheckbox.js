import MoviePoster from "../MoviePoster";
import styles from './withCheckbox.module.scss';
import * as assets from '../../../../utils/assets-manager';
import {useState} from 'react';


function withCheckbox(MoviePoster){
    return ({...props}) => {
        const checked = props.checked ?? false;
        const [isChecked, setIsChecked] = useState(checked);
        const onChangeHandler = props.onChange ?? (()=>{});



        ////////////////////////////////////
        // FUNCTIONS
        ////////////////////////////////////
        function onClickHandler(ev) {
            setIsChecked(!isChecked);
            onChangeHandler(!isChecked, props.movieId);
        }


        ////////////////////////////////////
        // JSX
        ////////////////////////////////////
        return (
            <div className={`${styles['with-checkbox']}`} onClick={onClickHandler}>
                <MoviePoster {...props} />
                <div className={`${styles['with-checkbox__overlay']}`}></div>
                {
                    isChecked ?
                    <assets.IconChecked className={`${styles['with-checkbox__icon']}`} />
                    :
                    <assets.IconUnchecked className={`${styles['with-checkbox__icon']}`} />
                }
            </div>
        );
    };
} 

export default withCheckbox;

   