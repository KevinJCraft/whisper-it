import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from "./AppBar";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import { loadUser } from "../actions/authActions";

import { Provider } from "react-redux";
import store from "../store";

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
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
