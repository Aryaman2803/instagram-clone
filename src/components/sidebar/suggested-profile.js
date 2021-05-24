import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";
export default function SuggestedProfile({
  suggestedUserDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  //* When user adds someone from the suggestion box,
  //*We only want to re-render the suggestion component not full re render
  //* We will remove that 1 particular profile
  const [followed, setFollowed] = useState(false);
  async function handleFollowUser(userId) {
    setFollowed(true);

    //* firebase: create 2 services (functions)
    // TODO: update the following array of the logged in user ( in this case,my profile)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    //TODO: update the followers array of the user who has been followed
    await updateFollowedUserFollowers(suggestedUserDocId, userId, false);
  }
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt="PROFIELE"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold tex-sm">{username}</p>
        </Link>
      </div>

      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={() => handleFollowUser(userId, profileId)}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.prototype = {
  suggestedUserDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
