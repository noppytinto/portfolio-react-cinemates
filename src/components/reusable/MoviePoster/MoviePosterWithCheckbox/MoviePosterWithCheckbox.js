// WithRoundBorders(WithFetcher(MoviePoster))
import MoviePoster from "../MoviePoster";
import styles from './MoviePosterWithCheckbox.module.scss';
import * as assets from '../../../../utils/assets-manager';
import {useState} from 'react';


export function withCheckbox(MoviePoster){
    return ({...props}) => {
        const [isChecked, setIsChecked] = useState(false);
        const onChangeHandler = props.onChange ?? (()=>{});


        ////////////////////////////////////
        // FUNCTIONS
        ////////////////////////////////////
        function onClickHandler(ev) {
            setIsChecked(!isChecked);
            onChangeHandler(isChecked);
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

export default withCheckbox(MoviePoster);

   