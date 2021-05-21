import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import { getUserPhotosByUsername } from "../../services/firebase";
import Photos from "./photos";
//* updating data somewhat same as useState
const reducer = (state, newState) => ({ ...state, ...newState });
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
      //* Dispatch allows to set values
      //* Updating the state with useReducer dispatch
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length ,
      });
    }
    getProfileInformationAndPhotos();
  }, [user,user.username]);
  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};