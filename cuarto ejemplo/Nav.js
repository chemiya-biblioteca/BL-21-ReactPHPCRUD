
import React from 'react';

import { NavLink } from "react-router-dom";
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarMenu: false,
        };
        this.intercambiarEstadoMenu = this.intercambiarEstadoMenu.bind(this);
        this.ocultarMenu = this.ocultarMenu.bind(this);
    }


    ocultarMenu() {
        this.setState({
            mostrarMenu: false,
        })
    }
    intercambiarEstadoMenu() {
        this.setState(state => {
            return {
                mostrarMenu: !state.mostrarMenu,
            }
        });
    }
    render() {
        return (
            <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    
                    <button onClick={this.intercambiarEstadoMenu} className={`navbar-burger ${this.state.mostrarMenu ? "is-active" : ""} is-warning button`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className={`navbar-menu ${this.state.mostrarMenu ? "is-active" : ""}`}>
                    <div className="navbar-start">
                        <NavLink onClick={this.ocultarMenu} activeClassName="is-active" className="navbar-item" to="/videojuegos/ver">Ver videojuegos</NavLink>
                        <NavLink onClick={this.ocultarMenu} activeClassName="is-active" className="navbar-item" to="/videojuegos/agregar">Agregar videojuego</NavLink>
                    </div>
                    
                </div>
            </nav>
        );
    }
}
export default Nav;