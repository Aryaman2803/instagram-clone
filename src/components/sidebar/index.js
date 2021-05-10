import { memo, useEffect } from "react";
import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";
import React from "react";
//* We are displaying of people user is not following suggestions in sidebar

const Sidebar = () => {
  const {
    user: { fullname, username, userId, following, docId },
  } = useUser();
  return (
    <div className="hidden lg:block p-4">
      <User fullname={fullname} username={username} />
      {/* Pull out like 10 users from the firestore except our userId We want to
    make sure in the followers of these 10 users,this userId does not exist. */}
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
};
export default Sidebar;
