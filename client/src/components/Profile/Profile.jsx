import React from "react";
import "./Profile.css";
import ProfileLeft from "../ProfileLeft/ProfileLeft";
import ProfileCard from "../ProfileCardJsx/ProfileCard"
import PostSide from "../PostSide/PostSide"
import RightSide from "../RightSide/RightSide"

function Profile() {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="profile-center">
        <ProfileCard location = "profilePage"/>
        <PostSide />
      </div>
      <RightSide/>
    </div>
  );
}

export default Profile;
