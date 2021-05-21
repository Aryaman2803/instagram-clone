import { useState, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user";
import firebase from "firebase";
const { FieldValue } = firebase.firestore;
export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const {
    user: { displayName },
  } = useContext(UserContext);
  const handleSubmitComment = (event) => {
    event.preventDefault();

    //Basically we are saying put this new value in existing array of comments using spread operator
    setComments([{ displayName, comment }, ...comments]);
    setComment("");

    //updating the comments array in firestore
    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({ comments: FieldValue.arrayUnion({ displayName, comment }) });
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(comment)
            : event.preventDefault()
        }
      >
        <input
          aria-label="add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add c comment..."
          value={comment}
          onChange={({ target }) => {
            setComment(target.value);
          }}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
          type="button"
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
