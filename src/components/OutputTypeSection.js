import { Route, Switch, useRouteMatch } from "react-router-dom";
import OutputTypeSectionCreate from "./OutputTypeSectionCreate";
import OutputTypeSectionIndex from "./OutputTypeSectionIndex";
import OutputTypeSectionMaintenance from "./OutputTypeSectionMaintenance";

export default function BankSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <OutputTypeSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <OutputTypeSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <OutputTypeSectionIndex />
            </Route>
        </Switch>
    )
}