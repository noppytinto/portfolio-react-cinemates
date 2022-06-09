import {useEffect, useState} from "react";

export default function useIntersection(targetRef, viewport=null) {
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIntersecting(entry.isIntersecting);
                    observer.disconnect();
                }
            }
        );

        observer.observe(targetRef.current)
        // Remove the observer as soon as the component is unmounted
    }, [targetRef])

    return isIntersecting;

}// useIntersection()