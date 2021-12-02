import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProductSectionCreate from "./ProductSectionCreate";
import ProductSectionIndex from "./ProductSectionIndex";
import ProductSectionMaintenance from "./ProductSectionMaintenance";

export default function ProductSection() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.path}/nuevo`}>
                <ProductSectionCreate />
            </Route>
            <Route exact path={`${match.path}/:id`}>
                <ProductSectionMaintenance />
            </Route>
            <Route exact path={match.path}>
                <ProductSectionIndex />
            </Route>
        </Switch>
    )
}