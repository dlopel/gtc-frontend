import { Route, Switch, useRouteMatch } from "react-router-dom";
import ExpenseSettlementSectionCreate from "./ExpenseSettlementSectionCreate";
import ExpenseSettlementSectionIndex from "./ExpenseSettlementSectionIndex";
import ExpenseSettlementSectionMaintenance from "./ExpenseSettlementSectionMaitenance";

export default function ExpenseSettlementSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <ExpenseSettlementSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <ExpenseSettlementSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <ExpenseSettlementSectionIndex />
            </Route>
        </Switch>
    )
}