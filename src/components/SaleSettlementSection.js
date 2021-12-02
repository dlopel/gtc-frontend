import { Route, Switch, useRouteMatch } from "react-router-dom";
import SaleSettlementSectionCreate from "./SaleSettlementSectionCreate";
import SaleSettlementSectionIndex from "./SaleSettlementSectionIndex";
import SaleSettlementSectionMaitenance from "./SaleSettlementSectionMaitenance";

export default function ExpenseSettlementSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <SaleSettlementSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <SaleSettlementSectionMaitenance />
            </Route>
            <Route exact path={match.path}>
                <SaleSettlementSectionIndex />
            </Route>
        </Switch>
    )
}