import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/AdminHome";
import Video from "./pages/Video";
import User from "./pages/User";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/adminhome">
            <AdminHome />
          </Route>
          <Route path="/video">
            <Video />
          </Route>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
