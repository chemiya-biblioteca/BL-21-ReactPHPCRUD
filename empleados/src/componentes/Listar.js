import React from 'react';
import {Link } from "react-router-dom";
import api from "../servicios/api"
class Listar extends React.Component {
   constructor(props){
    super(props);
    this.state={datosCargados:false,
    empleados:[]};
   }


    componentDidMount(){
        this.cargarDatos();
    }

    //{/*https://jsonplaceholder.typicode.com/users */}
    cargarDatos(){
        fetch(api)
        .then(respuesta=>respuesta.json())
        .then((datos)=>{
            
            
            
            this.setState({datosCargados:true,empleados:datos})
        
        })
        .catch(console.log)
    }


    borrarDatos=(id)=>{
        fetch(api+"?borrar="+id)
        .then(respuesta=>respuesta.json())
        .then((datos)=>{
            
            
            
            console.log(datos);
            this.cargarDatos();
        
        })
        .catch(console.log)
    }


    render() {

        const {datosCargados,empleados}=this.state

        if(!datosCargados){return (<div>cargando...</div>);}
        else{
        return (
            <div>
            <Link className="btn btn-primary" to={"/Crear"}>Crear</Link>
            <table className="table">
                <thead>

                    <tr>
                        <th>
                            id
                        </th>
                        <th>
                            nombre
                        </th>
                        <th>
                            correo
                        </th>
                        <th>
                            acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
            {empleados.map(
                (empleado)=>(
                    <tr key={empleado.id}>
                        <td>
                            {empleado.id}
                        </td>
                        <td>
                        {empleado.nombre}
                        </td>
                        <td>
                        {empleado.correo}
                        </td>
                        <td>
                           <Link className="btn btn-primary" to={"/Editar/"+empleado.id}>editar</Link>
                           <button className="btn btn-danger" onClick={()=>{this.borrarDatos(empleado.id)}}>eliminar</button>
                        </td>
                    </tr>
                )
            )}


                   
                </tbody>




            </table>
            </div>

        );
        }
    }
}

export default Listar;