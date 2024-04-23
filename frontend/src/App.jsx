import { useEffect, useState } from "react";
import Axios from "axios";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState("");

  const [listarEpleados, SetListarEmpleados] = useState([]);
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    ListaEmpleados();
  }, [listarEpleados]);

  function EnviarDatos() {
    Axios.post("http://localhost:8080/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    })
      .then(() => {
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Exitoso</strong>",
          //text: `El empleado ${nombre} fue creado con exito!!!`,  //Usar este para imprimir solo un texto
          html: `<i>El empleado <strong>${nombre}</strong> fue creado con exito!!!</i>`, //Usar este para HTML
          icon: "success",
          timer: 3000,
        });
      })
      .catch(function(error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logro crear el Empleado!",
          footer: error.message
        });
      })
  }

  function ListaEmpleados() {
    Axios.get("http://localhost:8080/listar")
      .then((response) => SetListarEmpleados(response.data))
      .catch((error) => console.log(error));
  }

  function editarEpleados(empleado) {
    setEditar(true);
    setNombre(empleado.nombre);
    setEdad(empleado.edad);
    setPais(empleado.pais);
    setCargo(empleado.cargo);
    setAnios(empleado.anios);
    setId(empleado.id_empleado);
  }

  function ActualizarDatos() {
    Axios.put("http://localhost:8080/update", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
      id_empleado: id,
    })
      .then(() => {
        setEditar(false);
        ListaEmpleados(); // Llamar de nuevo a ListaEmpleados para actualizar la lista
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro Exitoso</strong>",
          //text: `El empleado ${nombre} fue actualizado con exito!!!`,  Usar este para imprimir solo un texto
          html: `<i>El empleado <strong>${nombre}</strong> fue actualizado con exito!!!</i>`, //Usar este para HTML
          icon: "success",
          timer: 3000,
        });
      })
      .catch(function(error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logro modificar al Empleado!",
          footer: error.message
        });
      })
  }

  function EliminarDatos(empleado) {
    //Esto es del sweetalert2
    Swal.fire({
      title: "Confirmar Eliminado?",
      html: `<i>¿Realmente desea eliminar a <strong>${empleado.nombre}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        //Si el usuario confirma el pop-up, se lanza AXIOS
        Axios.delete(`http://localhost:8080/delete/${empleado.id_empleado}`)
          .then(() => {
            setEditar(false);
            ListaEmpleados(); // Llamar de nuevo a ListaEmpleados para actualizar la lista
            limpiarCampos();
            Swal.fire({
              title: "Eliminado!",
              text: `${empleado.nombre} fue Eliminado!`,
              icon: "success",
              timer: 3000
            })
          })
          .catch(function(error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro eliminar el Empleado!",
              footer: error.message
            });
          })
        }
    })
  }

  function limpiarCampos() {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false);
  }

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header"><h3>Gestion de Empleados</h3></div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre
            </span>
            <input
              type="text"
              onChange={(evento) => setNombre(evento.target.value)}
              className="form-control"
              placeholder="Ingrese un nombre"
              aria-label="Username"
              name="nombre"
              value={nombre}
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad
            </span>
            <input
              type="number"
              onChange={(evento) => setEdad(evento.target.value)}
              className="form-control"
              placeholder="Ingrese la edad"
              aria-label="Username"
              name="edad"
              value={edad}
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais
            </span>
            <input
              type="text"
              onChange={(evento) => setPais(evento.target.value)}
              className="form-control"
              placeholder="Ingrese el pais"
              aria-label="Username"
              name="pais"
              value={pais}
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo
            </span>
            <input
              type="text"
              onChange={(evento) => setCargo(evento.target.value)}
              className="form-control"
              placeholder="Ingrese el cargo"
              aria-label="Username"
              name="cargo"
              value={cargo}
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Experiencia
            </span>
            <input
              type="number"
              onChange={(evento) => setAnios(evento.target.value)}
              className="form-control"
              placeholder="Ingrese años"
              aria-label="Username"
              name="años"
              value={anios}
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar == true ? (
            <div>
              <button className="btn btn-warning m-2" onClick={ActualizarDatos}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={EnviarDatos}>
              Enviar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de Experiencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listarEpleados.map((empleado) => {
            return (
              <tr key={empleado.id_empleado}>
                <th scope="row">{empleado.id_empleado}</th>
                <td>{empleado.nombre}</td>
                <td>{empleado.edad}</td>
                <td>{empleado.pais}</td>
                <td>{empleado.cargo}</td>
                <td>{empleado.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => editarEpleados(empleado)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => EliminarDatos(empleado)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
