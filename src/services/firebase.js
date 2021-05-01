import { firebase, FieldValue } from "../lib/firebase";

export async function doesUserNameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  console.log("result", result);
  return result.docs.map((user) => user.data().length > 0);
}

//* Get user from the firestore where user id  === userid (passed from the auth)
export async function getUserByUserId(userid) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userid)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  // console.log("RESULT of user id DATA...", result);
  // console.log("USER ID DATA...", user);
  return user;
}
