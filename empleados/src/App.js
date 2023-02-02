import React from "react";
import Listar from "./componentes/Listar";
import Crear from "./componentes/Crear";
import Editar from "./componentes/Editar";
import { Route, BrowserRouter as Router,Link,Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function App() {

  return (
    <Router>
      <div className="container">

      <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">


            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link " to={"/"}>Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/Crear"}>Crear empleado</Link>
              </li>

             

            </ul>

          </div>
        </nav>



      

          <Route exact path="/" component={Listar }></Route>
      

     

          <Route path="/Crear" component={Crear }></Route>
       

     

          <Route path="/Editar/:id" component={Editar }></Route>
     

          



      </div>



    </Router>

  );
}






{/*https://www.youtube.com/watch?v=_DJBFUIT2Kg*/ }


