import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

const Post = forwardRef(
  ({ displayName, username, verified, text, image, avatar }, ref) => {
    return (
      <div className="post" ref={ref}>
        {/* Avatar */}
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>

        {/* Post Body */}
        <div className="post__body">
          {/* Post Header */}
          <div className="post__header">
            {/* Header Text */}
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />}@
                  {username}
                </span>
              </h3>
            </div>

            {/* Header Description */}
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>

          {/* Post Image */}
          <img src={image} alt="" />

          {/* Post Footer */}
          <div className="post__footer">
            {/* Icons for Interaction */}
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
