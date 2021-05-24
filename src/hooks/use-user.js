import { useState, useEffect } from "react";
import { getUserByUserId } from "../services/firebase";
//* Best way to query user in firestore is by userId from user Authentication

//hook to get user data from firestore
export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    async function getUserObjByUserId(userId) {
      //* We need a function that we can call (firebase service ) that gets the user data based on the id
      //* We make a function in services->firebse.js getUserObjectByUserId() which returns user data

      const [user] = await getUserByUserId(userId);
      setActiveUser(user || {});
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}
