import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./AppBar";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import { loadUser } from "../actions/authActions";

import { Provider } from "react-redux";
import store from "../store";
import ViewPost from "./ViewPost";

function App() {
  useEffect(() => {
    loadUser(store.dispatch);
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router>
          <AppBar />
          <Switch>
            <Route exact path="/">
              <PostList />
            </Route>
            <Route path="/create">
              <CreatePost />
            </Route>
            <Route path="/comments/:id">
              <ViewPost />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
