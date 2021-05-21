import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import { useParams } from "react-router-dom";
export default function Header({
  photosCount,
  //* It contains the profile we are visiting. It can be ours  or other profile
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername, //logged in user
  },
  followerCount,
  setFollowerCount,
}) {
  const [isFollowing, setisFollowing] = useState(false);
  const { user } = useUser();
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const { username: checkIfLoggedInUserByUrl } = useParams();

  const handleToggleFollow = async () => {
    //True or falsy
    setisFollowing((isFollowing) => !isFollowing);
    //Now updating firestore with dispatch which is passed from index.js
    //by passing an object
    setFollowerCount({
      followerCount: isFollowing ? followerCount - 1 : followerCount + 1,
    });

    //* updating in firestore
    await toggleFollow(
      isFollowing,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };
  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      //check if the logged in user is following the user he is visiting
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      //* We are initially returning userId if they were following the profile. But we want in truthy / falsy
      //* So we use !! to turn that value in truthy or falsy value
      setisFollowing(!!isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {user.username && (
          <img
            className="rounded-full h-16 w-16 md:h-20 lg:h-40 md:w-20 lg:w-40 flex"
            alt={`${user.username} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-24 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4 flex-col lg:flex-row">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {" "}
            {user.username === checkIfLoggedInUserByUrl
              ? user.fullname
              : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}
Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};