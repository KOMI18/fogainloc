import React, { useContext } from "react";
import { SidebarContext } from "./SidebarContext";
import { Link } from "react-router-dom";

function SideBar() {
    const { isSidebarVisible } = useContext(SidebarContext);

    return (
        <div className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isSidebarVisible ? '' : 'toggled'}`} id="accordionSidebar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/index">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">Fogain <sup>2</sup></div>
                    </Link>
                </li>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <Link className="nav-link" to="/index">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading"></div>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Actions</span>
                    </Link>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Adds:</h6>
                            <Link className="collapse-item" to="/AddLocataire">Ajouter un locataire</Link>
                            <Link className="collapse-item" to="/AddFacture">Ajouter un paiement</Link>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">List:</h6>
                            <Link className="collapse-item" to="/AllLocataire">Tous les locataires</Link>
                            <Link className="collapse-item" to="/AllFacture">Tous les paiements</Link>
                        </div>
                    </div>
                </li>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        </div>
    );
}

export default SideBar;
