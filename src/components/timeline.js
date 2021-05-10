import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "../components/posts";
//* We need to get the logged in user's photo (hook)

//* on loading the photos, we need to use react skeleton
//* if we have photos, render them (create a post component)
//*  if the user has no photos, tell them to create some photos

const Timeline = () => {
  const { photos } = usePhotos();
  return (
    <div className=" col-span-3 lg:col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  );
};

export default Timeline;
