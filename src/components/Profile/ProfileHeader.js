import React from 'react';


const ProfileHeader = props => {

    return (
        <div className="container">
            <div className="">
                <h2>{props.firstname} {props.lastname}</h2>
            </div>
        </div>
    )

}

export default ProfileHeader;