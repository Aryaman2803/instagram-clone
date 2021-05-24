import { createContext } from "react";

//* (1) Creating context so that we can use Firebase else where
//* (2) We initialize the Provider in ReactDOM (index.js)
//* (3) We import Firebase in Lib folder (firebase.js)
// provider-------component 1 ------- (firebase init here)
// -------component 2 -------
// -------component 3 -------
// consumer-------component 4 ------- (firebase init here)
// -------component 5 -------
// consumer-------component 6 ------- (firebase init here)

const FirebaseContext = createContext(null);
export default FirebaseContext;
