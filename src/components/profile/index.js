import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import { getUserPhotosByUsername } from "../../services/firebase";
import Photos from "./photos";
//* updating data somewhat same as useState
const reducer = (state, newState) => ({ ...state, newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};
export default function UserProfile({ user }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    //* From firebase
    async function getProfileInformationAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      //* Updating the state with useReducer dispatch
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers || 0,
      });
    }
    getProfileInformationAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
      />
      <Photos photos={photosCollection} />
      <p> hello {user.username}</p>
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};
