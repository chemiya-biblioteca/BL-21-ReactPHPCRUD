
import Nav from "./Nav";
import AgregarVideojuego from "./AgregarVideojuego";
import VerVideojuegos from "./VerVideojuegos";
import EditarVideojuego from "./EditarVideojuego";
import {
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Nav></Nav>
      <div className="section">
        <div className="columns">
          <Routes>
            <Route path="/videojuegos/agregar" element={<AgregarVideojuego/>}>
              
            </Route>
            <Route path="/videojuegos/editar/:id" element={<EditarVideojuego/>}>
              
            </Route>
            <Route path="/videojuegos/ver" element={<VerVideojuegos/>}>
              
            </Route>
            <Route path="/" element={<VerVideojuegos/>}>
              
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
