import { Route, Switch, useRouteMatch } from "react-router-dom";
import BankSectionCreate from "./BankSectionCreate";
import BankSectionIndex from "./BankSectionIndex";
import BankSectionMaintenance from "./BankSectionMaintenance";

export default function BankSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <BankSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <BankSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <BankSectionIndex />
            </Route>
        </Switch>
    )
}