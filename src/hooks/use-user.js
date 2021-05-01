import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";
//* Best way to query user in firestore is by userId from user Authentication

//hook to get user data from firestore
export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjectByUserId() {
      //* We need a function that we can call (firebase service ) that gets the user data based on the id
      //* We make a function in services->firebse.js getUserObjectByUserId() which returns user data
      const [response] = await getUserByUserId(user.uid);

      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjectByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
