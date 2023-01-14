import React, { useState, useEffect } from "react";
import "./InfoCard.css";

import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import * as UserApi from "../../api/UserRequest";
import { logOut } from "../../actions/AuthAction";

function InfoCard() {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="InfoCard">
      <div className="InfoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <FaPencilAlt
              width="2rem"
              height="1.2rem"
              onClick={() => {
                setModalOpened(true);
              }}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span> {profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives In</b>
        </span>
        <span> {profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span> {profileUser.worksAt}</span>
      </div>
      <div className="info">
        <span>
          <b>Country</b>
        </span>
        <span> {profileUser.country}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}

export default InfoCard;
