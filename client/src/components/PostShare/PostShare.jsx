import React, { useState, useRef } from "react";
import "./PostShare.css";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { BsCalendar3 } from "react-icons/bs";
import { MdSlowMotionVideo } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";

function PostShare() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  //  Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const imageRef = useRef();

  // handle post upload

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

   // Reset Post Share
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    <>
      <div className="PostShare">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="Profile"
        />
        <div>
          <input
            type="text"
            placeholder="What's happening"
            ref={desc}
            required
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <HiOutlinePhotograph />
              Photo
            </div>
            <div className="option" style={{ color: "var(--video)" }}>
              <MdSlowMotionVideo />
              Video
            </div>
            <div className="option">
              <HiOutlineLocationMarker style={{ color: "var(--location)" }} />
              Location
            </div>
            <div className="option" style={{ color: "var(--shedule)" }}>
              <BsCalendar3 />
              Shedule
            </div>
            <button
              className="button ps-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Share"}
            </button>
            <div className="" style={{ display: "none" }}>
              <input
                type="file"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
          {image && (
            <div className="previewImage">
              <RxCross1
                onClick={() => {
                  setImage(null);
                }}
              />
              <img src={URL.createObjectURL(image)} alt="preview" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PostShare;
