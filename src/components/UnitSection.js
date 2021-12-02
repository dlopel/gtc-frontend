import { Route, Switch, useRouteMatch } from "react-router-dom";
import UnitSectionCreate from "./UnitSectionCreate";
import UnitSectionIndex from "./UnitSectionIndex";
import UnitSectionMaintenance from "./UnitSectionMaintenance";

export default function UnitSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <UnitSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <UnitSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <UnitSectionIndex />
            </Route>
        </Switch>
    )
}