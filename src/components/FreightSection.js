import { Route, Switch, useRouteMatch } from "react-router-dom";
import FreightSectionCreate from "./FreightSectionCreate";
import FreightSectionIndex from "./FreightSectionIndex";
import FreightSectionMaintenance from "./FreightSectionMaintenance";

export default function FreightSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <FreightSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <FreightSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <FreightSectionIndex />
            </Route>
        </Switch>
    )
}



