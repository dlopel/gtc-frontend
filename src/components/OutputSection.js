import { Route, Switch, useRouteMatch } from "react-router-dom";
import OutputSectionCreate from "./OutputSectionCreate";
import OutputSectionIndex from "./OutputSectionIndex";
import OutputSectionMaintenance from "./OutputSectionMaintenance";

export default function FreightSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <OutputSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <OutputSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <OutputSectionIndex />
            </Route>
        </Switch>
    )
}



