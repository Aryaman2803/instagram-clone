import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "../components/posts";
import { useContext } from "react";
import LoggedInUserContext from "../context/logged-in-user";
//* We need to get the logged in user's photo (hook)

//* on loading the photos, we need to use react skeleton
//* if we have photos, render them (create a post component)
//*  if the user has no photos, tell them to create some photos

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className="col-span-3 lg:col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}
