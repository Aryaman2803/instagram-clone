import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Image from "./images";
import Action from "./actions";
import Footer from "./footer";
import Comments from "./comments";
export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  //*COMPONENTS->
  //-> header ,image, actions (like & comment icons), footer, comments

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <Header username={content.username} />
      <Image imageSrc={content.imageSrc} caption={content.caption} />
      <Action
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
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
