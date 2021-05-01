import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

//* We use this hook on top level of tree ( App.js)
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        //we have a user...therefore we can store the user in localstorage
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        //we dont have an authUser, therefore clear the local storage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    //cleanup
    return () => listener();
  }, [firebase]);

  //* We are returning because we just want context
  //* I know the hook has run and is listening to the StateChange
  //* Now I just want to connect into that not to recall this hook again and again
  //* So we create a context -> user.js which will help us check user data down the Component tree
  return { user };
}
