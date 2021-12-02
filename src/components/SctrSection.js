import { Route, Switch, useRouteMatch } from "react-router-dom";
import SctrSectionCreate from "./SctrSectionCreate";
import SctrSectionIndex from "./SctrSectionIndex";
import SctrSectionMaintenance from "./SctrSectionMaintenance";

export default function SctrSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <SctrSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <SctrSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <SctrSectionIndex />
            </Route>
        </Switch>
    )
}