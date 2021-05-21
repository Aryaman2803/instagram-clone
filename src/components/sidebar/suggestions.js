import { useState, useEffect } from "react";
import { getSuggestedProfiles } from "../../services/firebase";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggested-profile";
export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  // Get user suggested profile
  // Use the firebase service (call the userId)
  // call the async funcn in this firebase service, call it within useEffect
  //store it in state

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId,following]);
  
  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounder flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2"></div>
      <p className="font-bold text-gray-base">Suggestions for you</p>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            suggestedUserDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.prototype = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.array,
};
