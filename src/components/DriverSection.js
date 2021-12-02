import { Route, Switch, useRouteMatch } from "react-router-dom";
import DriverSectionCreate from "./DriverSectionCreate";
import DriverSectionIndex from "./DriverSectionIndex";
import DriverSectionMaintenance from "./DriverSectionMaintenance";

export default function DriverSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <DriverSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <DriverSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <DriverSectionIndex />
            </Route>
        </Switch>
    )
}