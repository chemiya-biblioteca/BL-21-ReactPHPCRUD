import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListUser() {

    const [users, setUsers] = useState([]);//variable para lo susuarios
    useEffect(() => {
        getUsers();
    }, []);//al iniciar traigo los uusarios

    function getUsers() {//hago peticion a la api y lo guardo en la variable
        axios.get('http://localhost/api/users/').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const deleteUser = (id) => {//hago peticion a la api con el id y actualizo usuarios
        axios.delete(`http://localhost/api/user/${id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    }
    return (
        <div>
            <h1>List Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{/**recorro los usuarios y por cada uno muestro sus atributos */}
                    {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{/**paso el id para la ruta y para borrar */}
                                <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}
