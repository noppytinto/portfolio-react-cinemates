import React from 'react';
import styles from './CastList.module.scss';
import {v4 as uuidv4} from 'uuid';
import CastCard from "../CastCard/CastCard";

function CastList(props) {
    let classes = `${styles['cast-list']} `;
    const cast = props.cast ?? [];


    //////////////////////////////////////
    // functions
    //////////////////////////////////////
    function spawnCards(cast) {
        return (
            cast.map((castMember) => {
                    return (
                        <li key={uuidv4()}>
                            <CastCard id={castMember.id}
                                      imageUrl={castMember.profilePictureUrl}
                                      alt={castMember.name}
                                      name={castMember.name}
                            />
                        </li>
                    );
                }
            )
        );
    }


    //////////////////////////////////////
    // JSX
    //////////////////////////////////////
    return (
        <div className={classes}>
            <ul>
                {spawnCards(cast)}
            </ul>
        </div>

    );
}// CastList

export default CastList;