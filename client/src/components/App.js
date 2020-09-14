import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./AppBar";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import { loadUser } from "../actions/authActions";

import { Provider } from "react-redux";
import store from "../store";
import ViewPost from "./ViewPost";
import ViewProfile from "./ViewProfile";
import ViewExtendedComments from "./ViewExtendedComments";
import Redirect from "./Redirect";
import ErrorSnackbar from "./ErrorSnackbar";

function App() {
  useEffect(() => {
    loadUser(store.dispatch);
  }, []);
  return (
    <>
      <Provider store={store}>
        <ErrorSnackbar />
        <Router>
          <AppBar />
          <Switch>
            <Route exact path="/">
              <Redirect />
            </Route>
            <Route exact path="/posts/:sort">
              <PostList />
            </Route>
            <Route exact path="/create">
              <CreatePost />
            </Route>
            <Route exact path="/comments/extended/:id">
              <ViewExtendedComments />
            </Route>
            <Route exact path="/comments/:sort/:id">
              <ViewPost />
            </Route>

            <Route exact path="/user/profile/:sort/:name">
              <ViewProfile />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
