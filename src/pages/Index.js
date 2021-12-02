import React from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Logo from '../components/Logo'
import WelcomeUser from '../components/WelcomeUser'
import TransportSection from '../components/TransportSection'
import ErrorBoundary from '../components/ErrorBoundary'
import RouteSection from '../components/RouteSection'
import UnitSection from '../components/UnitSection'
import DriverSection from '../components/DriverSection'
import ProductSection from '../components/ProductSection'
import FreightSection from '../components/FreightSection'
import ExpenseSettlementSection from '../components/ExpenseSettlementSection'
import BankSection from '../components/BankSection'
import OutputTypeSection from '../components/OutputTypeSection'
import OutputSection from '../components/OutputSection'
import ClientSection from '../components/ClientSection'
import PolicySection from '../components/PolicySection'
import SctrSection from '../components/SctrSection'
import SaleSettlementSection from '../components/SaleSettlementSection'
import NotFound from '../components/404'
import './Index.css'

export default function Index() {

    return (
        <React.Fragment>
            <header className="header">
                <div className="header__left">
                    <Logo />
                </div>
                <div className="header__right">
                    <WelcomeUser abbrName='Diego Lope' />
                </div>
            </header>
            <div className="aside-main-container">
                <aside className="aside">
                    <nav className='main-nav'>
                        <ul className='main-menu'>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <span className="main-menu__link">Operaciones</span><i className="fas fa-route"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/fletes' className="main-sub-menu__link">Viajes</Link>
                                    </li>
                                    <li>
                                        <Link to='/conductores' className="main-sub-menu__link">Conductores</Link>
                                    </li>
                                    <li>
                                        <Link to='/unidades' className="main-sub-menu__link">Unidades</Link>
                                    </li>
                                    <li>
                                        <Link to='/rutas' className="main-sub-menu__link">Rutas</Link>
                                    </li>
                                    <li>
                                        <Link to='/transportistas' className="main-sub-menu__link">Transportistas</Link>
                                    </li>
                                    <li>
                                        <Link to='/productos' className="main-sub-menu__link">Productos</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <span className="main-menu__link" >Liq. Conductores</span><i className="far fa-list-alt"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/liquidaciones-de-gastos' className="main-sub-menu__link">Liquidacion</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <Link className="main-menu__link" to='/'>Combustible</Link><i className="fas fa-gas-pump"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/' className="main-sub-menu__link">Abastecimientos</Link>
                                    </li>
                                    <li>
                                        <Link to='/' className="main-sub-menu__link">Ciclos</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <span className="main-menu__link" to='/'>Caja</span><i className="fas fa-cash-register"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/egresos' className="main-sub-menu__link">Egreso</Link>
                                    </li>
                                    <li>
                                        <Link to='/tipos-de-egreso' className="main-sub-menu__link">Tipos de Egreso</Link>
                                    </li>
                                    <li>
                                        <Link to='/bancos' className="main-sub-menu__link">Bancos</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <Link className="main-menu__link" to='/'>Fac. Clientes</Link><i className="far fa-file-alt"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/clientes' className="main-sub-menu__link">Registro Clientes</Link>
                                    </li>
                                    <li>
                                        <Link to='/liquidaciones-de-clientes' className="main-sub-menu__link">Facturar Viajes</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <Link className="main-menu__link" to='/'>Fac. Proveedores</Link><i className="far fa-file-alt"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/' className="main-sub-menu__link">Proveedor</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <span className="main-menu__link" >Documentos</span><i className="far fa-file-image"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/polizas' className="main-sub-menu__link">Poliza</Link>
                                    </li>
                                    <li>
                                        <Link to='/sctrs' className="main-sub-menu__link">SCTR</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className='main-menu__item'>
                                <div className="main-menu__item-content">
                                    <Link className="main-menu__link" to='/'>Mantenimiento</Link><i className="fas fa-wrench"></i>
                                </div>
                                <ul className='main-sub-menu'>
                                    <li>
                                        <Link to='/' className="main-sub-menu__link">Mantenimiento</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="main-container" role='main'>
                    <ErrorBoundary>
                        <Switch>
                            <Route path='/transportistas'>
                                <TransportSection />
                            </Route>
                            <Route path='/rutas'>
                                <RouteSection />
                            </Route>
                            <Route path='/unidades'>
                                <UnitSection />
                            </Route>
                            <Route path='/conductores'>
                                <DriverSection />
                            </Route>
                            <Route path='/productos'>
                                <ProductSection />
                            </Route>
                            <Route path='/fletes'>
                                <FreightSection />
                            </Route>
                            <Route path='/liquidaciones-de-gastos'>
                                <ExpenseSettlementSection />
                            </Route>
                            <Route path='/bancos'>
                                <BankSection />
                            </Route>
                            <Route path='/tipos-de-egreso'>
                                <OutputTypeSection />
                            </Route>
                            <Route path='/egresos'>
                                <OutputSection />
                            </Route>
                            <Route path='/clientes'>
                                <ClientSection />
                            </Route>
                            <Route path='/polizas'>
                                <PolicySection />
                            </Route>
                            <Route path='/sctrs'>
                                <SctrSection />
                            </Route>
                            <Route path='/liquidaciones-de-clientes'>
                                <SaleSettlementSection />
                            </Route>
                            <Route path='/404'>
                                <NotFound />
                            </Route>
                            <Redirect to='/404' />
                        </Switch>
                    </ErrorBoundary>
                </main>
            </div>
        </React.Fragment>
    )
}