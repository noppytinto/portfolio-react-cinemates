import {useEffect, useState} from "react";

export default function useIntersection(targetRef, viewport=null) {
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            // callback
            (entries, observer) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIntersecting(entry.isIntersecting);
                    observer.disconnect();
                }
            },

            // options
            {
                root: null,
                threshold: 0.8 // for mobile safari bug
            }
        );

        observer.observe(targetRef.current)
        // Remove the observer as soon as the component is unmounted
    }, [targetRef])

    return isIntersecting;

}// useIntersection()
