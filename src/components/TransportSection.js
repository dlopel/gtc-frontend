import { Route, Switch, useRouteMatch } from "react-router-dom";
import TransportSectionIndex from "./TransportSectionIndex";
import TransportSectionCreate from "./TransportSectionCreate";
import TransportSectionMaintenance from "./TransportSectionMaintenance";

export default function TransportSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <TransportSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <TransportSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <TransportSectionIndex />
            </Route>
        </Switch>
    )
}