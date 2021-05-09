// import { firebase, FieldValue } from "../lib/firebase";
import firebase from "firebase";
const { FieldValue } = firebase.firestore;
export async function doesUserNameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
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

//* Get the profiles for suggestions component.
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

//* Updating in Suggested-profiles
//updateLoggedInUserFollowing,updateFollowedUserFollowers,

export async function updateLoggedInUserFollowing( //Toggle funcn
  loggedInUserDocId, //Currently logged in user Document Id (Aryaman)
  profileId, // the user that Arayaman requests to follow
  isFollowingProfile // Am I currently following this person
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

//Updating the suggested user's profile follower array
export async function updateFollowedUserFollowers( //Toggle funcn
  suggestedUserDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(suggestedUserDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId) //unfollow
        : FieldValue.arrayUnion(loggedInUserDocId), //follow
    });
}

//* Fetching Timeline photos by checking the following array
export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

//Getting all photos of the user profile by username
export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  const photos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return photos;
}

export async function isUserFollowingProfile(loggedInUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  // i knew i was getting array back from .map, so just to get value immediately
  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

//* Updating the follow/ unfollow toggle

// export async function toggleFollow(
//   isFollowingProfile,
//   activeUserDocId,
//   profileDocId,
//   profileUserId,
//   followingUserId
// ) {
//   await updateLoggedInUserFollowing(
//     activeUserDocId, //* Active logged in user DocId (me)
//     profileUserId, //* Active user's profile UserId
//     isFollowingProfile //* Is the user following this profile? : Am i following the Raphael's profile
//   );
//   await updateFollowedUserFollowers(
//     profileDocId, //* Active logged in user DocId (me)
//     followingUserId, //* The user I request to follow (raphael)
//     isFollowingProfile //* Is the user following this profile? : Am i following the Raphael's profile
//   );
// }


export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}