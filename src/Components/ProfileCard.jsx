import React from "react";
import "./ProfileCard.css";

function ProfileCard(props) {

    const goToUserProfile = (matricule) => {
        window.location.href = `/user-profile/${matricule}`
    }

    return (
        <div className="card-container" onClick={() => { goToUserProfile(props.matricule) }}>
            <header className="bg-card">
                <img src={props.avatar} alt={props.username} />
            </header>
            <h1 className="bold-text">
                {props.username}<span className="normal-text">{" - " + props.level}</span>
            </h1>
            <h2 className="normal-text">{props.matricule}</h2>
            <div className="social-container">
                <div className="followers">
                    <h1 className="bold-text">{props.age}</h1>
                    <h2 className="smaller-text">years old</h2>
                </div>
                <div className="likes">
                    <h1 className="bold-text">{props.paid}</h1>
                    <h2 className="smaller-text">Ar</h2>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;