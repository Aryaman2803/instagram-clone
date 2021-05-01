import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";
//* We are displaying of people user is not following suggestions in sidebar
const Sidebar = () => {
  const {
    user: { fullname, username, userId },
  } = useUser();

  return (
    <div className="p-4">
      <User fullname={fullname} username={username} />
      {/* Pull out like 10 users from the firestore except our userId We want to
    make sure in the followers of these 10 users,this userId does not exist. */}
      <Suggestions userId={userId} />
    </div>
  );
  return <p>helloooooooo</p>;
};
export default Sidebar;
