import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUserNameExists } from "../services/firebase";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  //Error Handling
  const [error, setError] = useState("");
  const isInvalid =
    username === "" ||
    fullname === "" ||
    password === "" ||
    emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    //We create a function to check if the user exists
    const usernameExist = await doesUserNameExists(username);
    // console.log("usernameExists", usernameExist);
    if (!usernameExist.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        //* authentication
        //* -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({ displayName: username });

        //* firebase user collection ( create a document)
        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullname,
            emailAddress: emailAddress.toLowerCase(),
            following: ["2"],
            followers: [],
            dateCreated: Date.now(),
          });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullname("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername('');
      setError("That username is already taken, please try again.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen px-4 lg:px-0">
      <div className="hidden lg:flex w-full lg:w-3/5">
        <img
          className="object-scale-down"
          src="/images/iphone-with-profile.jpg"
          alt="Iphone with Instagram"
        />
      </div>
      <div className="flex flex-col w-full lg:w-2/5 justify-center h-full max-w-md m-auto ">
        <div className="flex flex-col items-center bg-white p-4 bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              } `}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items=center flex-col w-full bg-white p-4 border rounded border-gray-primary">
          <p className="text-sm">
            Have an account?
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              {" "}
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

//bg-blue-medium
//text-red-primary
//text-blue-medium
//text-gray-base
//border-gray-primary
