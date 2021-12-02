import { Route, Switch, useRouteMatch } from "react-router-dom";
import PolicySectionCreate from "./PolicySectionCreate";
import PolicySectionIndex from "./PolicySectionIndex";
import PolicySectionMaintenance from "./PolicySectionMaintenance";

export default function PolicySection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <PolicySectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <PolicySectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <PolicySectionIndex />
            </Route>
        </Switch>
    )
}