import React from 'react';
import styles from './CastList.module.scss';
import {v4 as uuidv4} from 'uuid';
import CastCard from "../CastCard/CastCard";

function CastList(props) {
    const cast = props.cast ?? [];


    //////////////////////////////////////
    // FUNCTIONS
    //////////////////////////////////////
    function spawnCards(cast) {
        return cast.map((castMember) =>
            <li key={uuidv4()}>
                <CastCard id={castMember.id}
                          imageUrl={castMember.profilePictureUrl}
                          alt={castMember.name}
                          name={castMember.name}
                />
            </li>
        );
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <div className={`${styles['cast-list']} `}>
            <ul>
                {spawnCards(cast)}
            </ul>
        </div>

    );
}// CastList

export default CastList;