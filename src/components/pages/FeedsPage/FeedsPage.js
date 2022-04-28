import PlaceholderPage from '../../reusable/PlaceholderPage/PlaceholderPage';
import OutlineButton from '../../reusable/OutlineButton/OutlineButton';
import {useNavigate} from 'react-router-dom';
import styles from "./FeedsPage.module.css";
import * as assets from '../../../utils/assets-manager';


function FeedsPage() {
    let navigate = useNavigate();

    const buttonHandler = (ev) => {
        ev.preventDefault();
        navigate(assets.pathPlayground);
    };

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <div  className={`${styles['home-page']}`}>
            <PlaceholderPage>
                <p>
                    Home
                </p>
                <br />
                <br />
            <OutlineButton onClick={buttonHandler}>Go to Playground</OutlineButton>
            </PlaceholderPage>
        </div>
    );
}// FeedsPage

export default FeedsPage;