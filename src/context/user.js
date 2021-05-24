import { createContext } from "react";
//* This context will provide context where value will be provided from Hooks ->(use-auth-listener.js)

const UserContext = createContext(null);
export default UserContext;
