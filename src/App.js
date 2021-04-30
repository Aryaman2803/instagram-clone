import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

//Lazy allows to split our huge bundle into chunks
//If you have everything in one bundle which is large ~5MB which we want to avoid having client download it
//So we can Code split the Web Pack ~ 0.5MB
//We only need the login , signup or dashboard, user profile page.

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login}></Route>
          <Route path={ROUTES.SIGN_UP} component={SignUp}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
