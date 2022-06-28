import styles from './WithMainHeader.module.scss';
import MainHeader from '../../ui-components/MainHeader/MainHeader';
import { Outlet } from 'react-router-dom';
import MainNav from "../../ui-components/MainNav/MainNav";


function WithMainHeader(props) {
    // const headerRef = React.createRef();
    // const outletRef = React.createRef();

    // useEffect(() => {
    //     const callback = () => {
    //         console.log('intersected with header');
    //     };
    //
    //     const options = {
    //         root: headerRef.current,
    //         threshold: [0.1]
    //     };
    //
    //     const observer = new IntersectionObserver(callback, options);
    //     observer.observe(outletRef.current);
    // }, [headerRef, outletRef]);

    return (
        <>
            <header className={`${styles['with-main-header']} ${props.className}`} >
                <MainHeader />
                <MainNav />
            </header>
            <Outlet/>
        </>
    );
}

export default WithMainHeader;