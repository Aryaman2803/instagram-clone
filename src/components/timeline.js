import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
//* We need to get the logged in user's photo (hook)

//* on loading the photos, we need to use react skeleton
//* if we have photos, render them (create a post component)
//*  if the user has no photos, tell them to create some photos

const Timeline = () => {
  const { photos } = usePhotos();
  console.log(photos);
  return (
    <div className="container col-span-2 ml-2">
      <p>hello timeline</p>
    </div>
  );
};

export default Timeline;
