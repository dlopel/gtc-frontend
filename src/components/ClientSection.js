import { Route, Switch, useRouteMatch } from "react-router-dom";
import ClientSectionIndex from "./ClientSectionIndex";
import ClientSectionCreate from "./ClientSectionCreate";
import ClientSectionMaintenance from "./ClientSectionMaintenance";

export default function ClientSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <ClientSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <ClientSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <ClientSectionIndex />
            </Route>
        </Switch>
    )
}