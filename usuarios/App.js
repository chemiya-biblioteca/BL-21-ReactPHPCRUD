import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Insert from "./page/Insert";
import Edit from "./page/Edit";

function App() {
  return (
    <div className='app'>{/**efino las rutas y los componentes a los que voy */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/edit/:ids" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;