import React from 'react';
import { Link } from "react-router-dom";
import api from "../servicios/api"


class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,empleado:[]
         }
    }
   

  
    cambioValor=(e)=>{
        const state=this.state.empleado;
        state[e.target.name]=e.target.value;
        this.setState({empleado:state});
      }

      enviarDatos=(e)=>{
        e.preventDefault();
        
        const{id,nombre,correo}=this.state.empleado;
        var datosEnviar={id:id,nombre:nombre,correo:correo}
        fetch(api+"?actualizar=1",{
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
    
    
    componentDidMount(){
       
        fetch(api+"?consultar="+this.props.match.params.id)
        .then(respuesta=>respuesta.json())
        .then((datos)=>{
            
            
            
            this.setState({datosCargados:true,empleado:datos[0]});
            
        
        })
        .catch(console.log)

    }
    render() { 
        const {datosCargados,empleado}=this.state;
        if(!datosCargados){return (<div>cargando...</div>);}
        else{
        return ( 
            <div  >
            <form onSubmit={this.enviarDatos}>
            <div className="mb-3">
                <label for="exampleInputcorreo1" className="form-label">id</label>
                <input type="text" readOnly name="nombre" onChange={this.cambioValor} value={empleado.id} className="form-control" id="nombre" />
    
              </div>



              <div className="mb-3">
                <label for="exampleInputcorreo1" className="form-label">nombre</label>
                <input required type="text" name="nombre" onChange={this.cambioValor} value={empleado.nombre} className="form-control" id="nombre" />
    
              </div>
              <div class="mb-3">
                <label for="exampleInputcorreo1" className="form-label">correo</label>
                <input required type="text" name="correo" onChange={this.cambioValor} value={empleado.correo} className="form-control" id="nombre" />
    
              </div>
    
              <button type="submit" className="btn btn-primary" >guardar</button>
              <Link className="btn btn-warning" to={"/"}>cancelar</Link>
            </form>
    
          </div>

         );
    }
}
}
 
export default Editar;