import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Canvas } from "./Canvas";
import LevelEdit from "./LevelEdit";
import AvatarEdit from "./AvatarEdit";

const Routes = (props) => {
    return(
        <Router>
            <Switch>
                <Route path='/edit-avatar'>
                    <AvatarEdit />
                </Route>
                <Route path="/edit-map">
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
