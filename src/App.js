import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

import IsUserLoggedIn from "./helpers/is-user-loggedIn";
import ProtectedRoute from "./helpers/protected-routes";

//Lazy allows to split our huge bundle into chunks
//If you have everything in one bundle which is large ~5MB which we want to avoid having client download it
//So we can Code split the Web Pack ~ 0.5MB
//We only need the login , signup or dashboard, user profile page.

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));

export default function App() {
  //user data getting to create a Context Provider in here
  const { user } = useAuthListener();
  return (
    //* Injecting UserContext in FirebaseContext ->(index.js)
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>

            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP}
            >
              <SignUp />
            </IsUserLoggedIn>

            <ProtectedRoute user={user} path={ROUTES.PROFILE}>
              <Profile/>
            </ProtectedRoute>
             {/* <Route path={ROUTES.PROFILE} component={Profile} /> */}
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

//* Without protected path
// <UserContext.Provider value={{ user }}>
//       <Router>
//         <Suspense fallback={<p>Loading...</p>}>
//           <Switch>
//             <Route path={ROUTES.LOGIN} component={Login}></Route>
//             <Route path={ROUTES.SIGN_UP} component={SignUp}></Route>
//             <Route path={ROUTES.DASHBOARD} component={Dashboard}></Route>
//             <Route component={NotFound}></Route>
//           </Switch>
//         </Suspense>
//       </Router>
//     </UserContext.Provider>
