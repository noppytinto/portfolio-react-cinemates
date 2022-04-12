import styles from './Home.module.css';
import PlaceholderPage from '../reusable/PlaceholderPage/PlaceholderPage';
import OutlineButton from '../reusable/OutlineButton/OutlineButton';
import {useNavigate} from 'react-router-dom';

function Home() {
    let navigate = useNavigate();

    const buttonHandler = (ev) => {
        ev.preventDefault();
        navigate('/playground');
    };




    return (
        <>
            <PlaceholderPage>
                <p>
                    Home
                </p>
                <br />
                <br />


            <OutlineButton onClick={buttonHandler}>Go to Playground</OutlineButton>
            </PlaceholderPage>
        </>

    );
}

export default Home;