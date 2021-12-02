import React from 'react'
import { Route, Switch, useRouteMatch } from "react-router";
import RouteSectionCreate from './RouteSectionCreate';
import RouteSectionIndex from './RouteSectionIndex';
import RouteSectionMaintenance from './RouteSectionMaintenance';

export default function RouteSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <RouteSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <RouteSectionMaintenance />
            </Route>
            <Route exact path={`${match.path}`}>
                <RouteSectionIndex />
            </Route>
        </Switch>
    )
}