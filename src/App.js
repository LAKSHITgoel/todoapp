import React from "react";
import Home from "./home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import store from "./store/store";
import { Provider } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  ToDo App
                </Typography>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
