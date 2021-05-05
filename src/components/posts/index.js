import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./images";
export default function Post({ content }) {
  const {
    username,
    imageSrc,
    caption,
    docId,
    totalLikes,
    likedPhoto,
    handleFocus,
  } = content;
  //*COMPONENTS->
  //-> header ,image, actions (like & comment icons), footer, comments
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <Header username={username} />
      <Image imageSrc={imageSrc} caption={caption} />
    </div>
  );
}

Post.prototype = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool,
    likes: PropTypes.array,
    comments: PropTypes.array,
    dateCreated: PropTypes.array.isRequired,
  }),
};
