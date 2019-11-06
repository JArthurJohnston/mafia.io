import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Canvas } from "./Canvas";
import LevelEdit from "./LevelEdit";

const Routes = (props) => {
    return(
        <Router>
            <Switch>
                <Route path="/level-edit">
                    <LevelEdit />
                </Route>
                <Route path="/">
                    <Canvas/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;
