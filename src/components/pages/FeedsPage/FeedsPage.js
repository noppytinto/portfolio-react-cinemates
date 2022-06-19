import PlaceholderPage from '../../reusable/PlaceholderPage/PlaceholderPage';
import OutlineButton from '../../reusable/OutlineButton/OutlineButton';
import {useNavigate} from 'react-router-dom';
import styles from "./FeedsPage.module.scss";
import * as assets from '../../../utils/assets-manager';
import {motion} from 'framer-motion';

function FeedsPage(props) {
    let navigate = useNavigate();

    const buttonHandler = (ev) => {
        ev.preventDefault();
        navigate(assets.pathPlayground);
    };

    ////////////////////////////
    // JSX
    ////////////////////////////
    return (
        <motion.div  className={`${styles['home-page']}`}
                     initial="hidden"
                     animate="visible"
                     // exit="hidden"
                     variants={props.variants}
        >
            <PlaceholderPage>
                <p>
                    (work in progress)
                </p>
                <br />
                <br />
            <OutlineButton onClick={buttonHandler}>Go to Playground</OutlineButton>
            </PlaceholderPage>
        </motion.div>
    );
}// FeedsPage

export default FeedsPage;