import { Button } from 'bootstrap';
import React from 'react';
import {Link} from "react-router-dom";
import api from "../servicios/api"
class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre:"",
      correo:"",
      errores:[]

    }
  }

  verificarError(elemento){
    return this.state.errores.indexOf(elemento)!==-1;
  }
  
  cambioValor=(e)=>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState({state,errores:[]});
  }

  enviarDatos=(e)=>{
    e.preventDefault();
    const{nombre,correo}=this.state;
    console.log(nombre);
    console.log(correo);

    var datosEnviar={nombre:nombre,correo:correo}
    var errores=[];
if(!nombre)errores.push("error_nombre");
if(!correo)errores.push("error_correo");

this.setState({errores:errores});
if(errores.length>0)return false;




    fetch(api+"?insertar=1",{
      method:"POST",
      body:JSON.stringify(datosEnviar)
      

    })
        .then(respuesta=>respuesta.json())
        .then((datos)=>{
            
            
            
            console.log(datos);
            this.props.history.push("/");
        
        })
        .catch(console.log)
    }


  


  render() {
    const{nombre,correo}=this.state;
    return (
      <div  >
        <form onSubmit={this.enviarDatos}>
          <div className="mb-3">
            <label for="exampleInputcorreo1" className="form-label">nombre</label>
            <input type="text" name="nombre" onChange={this.cambioValor} value={nombre} className={((this.verificarError("error_nombre"))?"is-invalid":"")+" form-control"} id="nombre" />
        <small className="invalid-feedback">escribe nombre</small>
          </div>
          <div class="mb-3">
            <label for="exampleInputcorreo1" className="form-label">correo</label>
            <input type="text" name="correo" onChange={this.cambioValor} value={correo} className={((this.verificarError("error_correo"))?"is-invalid":"")+" form-control"} id="correo" />
            <small className="invalid-feedback">escribe correo</small>
          </div>

          <button type="submit" className="btn btn-primary" >guardar</button>
          <Link className="btn btn-warning" to={"/"}>cancelar</Link>
        </form>

      </div>


    );
  }
}

export default Crear;