import PlaceholderPage from '../reusable/PlaceholderPage/PlaceholderPage';
import OutlineButton from '../reusable/OutlineButton/OutlineButton';
import {useNavigate} from 'react-router-dom';
import styles from "./Home.module.css";

function Home() {
    let navigate = useNavigate();

    const buttonHandler = (ev) => {
        ev.preventDefault();
        navigate('/playground');
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
}// Home

export default Home;