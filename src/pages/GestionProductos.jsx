import React from 'react'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alerta } from '../helpers/funcionSweetAlert'
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { useFetchData } from "../hooks/useFetchData"
import 'postcss';
import axios from 'axios';


export const GestionProductos = () => {

  //Desustructuramos los parametros que estamos recibiendo:
  const { data, isLoading } = useFetchData("http://localhost:8080/api/productos")

  //Manejar el estado en componentes funcionales
  const [productos, setProductos] = useState([])
  const [id, setId] = useState("")
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [imagen, setImagen] = useState("")
  const [operacion, setOperacion] = useState(1)
  const [titulo, setTitulo] = useState("")

  //Una vez que se redenderice la pagina cargue todos los productos
  useEffect(() => {
    if (!isLoading) {
      setProductos(data);
      console.log(data)
    }
  }, [data, isLoading]);

  const openModal = (op, id, nombre, descripcion, precio, imagen) => {
    //Cuando se abre el modal seteamos los valores:  
    setId('')
    setNombre('')
    setDescripcion('')
    setPrecio('')
    setImagen('')
    setOperacion(op)

    //si la operacion es 1 el titulo cambia
    if (op == 1) {
      setTitulo('Registrar Producto')
    }
    else if (op == 2) {
      setTitulo('Editar Producto')
      setId(id)
      setNombre(nombre)
      setDescripcion(descripcion)
      setPrecio(precio)
      setImagen(imagen)
    }
    //Encendemos el primer foto del formulario
    // Establece un temporizador para que la siguiente acción se ejecute después de un cierto tiempo (en milisegundos)
    window.setTimeout(
      function () {
        // Dentro de la función que se ejecutará después del tiempo especificado
        // Obtiene el elemento del DOM con el ID 'nombre'
        document.getElementById('nombre').focus();

        // La función focus() se utiliza para darle el foco (hacer que se seleccione) al elemento, 
        // en este caso, al elemento con el ID 'nombre'.
        // Esto significa que, después de 500 milisegundos (o 0.5 segundos), el cursor se ubicará en el campo de entrada con el ID 'nombre'.
      }, 500
    )
  }

  const validar = () => {

    var productoParametro;
    var metodo;
    var URL;

    //Validamos los campos antes de enviar la solicitud
    if (nombre.trim() == '') {
      show_alerta('Escriba el nombre del producto', 'warning')
    }
    else if (precio.trim() == '') {
      show_alerta('Escribe el precio del producto', 'warning')
    }
    else if (imagen.trim() == '') {
      show_alerta('Escriba la URL de la imagen', 'warning')
    }

    else {
      //Revisamos cual es la operacion actual
      if (operacion == 1) { //1 es para guardar (POST)
        //Creamos el objeto
        productoParametro = { nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio.trim(), imagen: imagen.trim() }
        metodo = 'POST'
        URL = 'http://localhost:8080/api/productos'
      }
      else { //2 es para actualizar (PUT)
        productoParametro = { id: id, nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio.trim(), imagen: imagen.trim() }
        metodo = 'PUT'
        URL = `http://localhost:8080/api/productos/${productoParametro.id}`
      }
      //Una vez que se asigne el parametro y el metodo de acuerdo a la operacion, enviamos la solicitud
      enviarSolicitud(metodo, productoParametro, URL)
    }
  }

  // Definición de la función enviarSolicitud
  const enviarSolicitud = async (metodo, parametro, direccion) => {
    // Realiza una solicitud usando axios
    await axios({ method: metodo, url: direccion, data: parametro }).then(function (respuesta) {

      // Verificar el código de estado HTTP
      if (respuesta.status === 200) {
        document.getElementById('btncerrar').click();
        // Recargar los datos desde el servidor
        if (metodo === 'DELETE') {
          show_alerta('Produto eliminado', 'success')
          document.getElementById('btncerrar').click()
          setProductos(productos.filter(producto => producto.id !== id))

        } else if (metodo === 'POST') {
          // Si la operación es de agregar, actualiza el estado agregando el nuevo producto
          show_alerta('Producto guardado', 'success')
          document.getElementById('btncerrar').click()
          setProductos([...productos, parametro])

        } else {
          // Si la operación es de agregar, actualiza el estado agregando el nuevo producto
          show_alerta('Producto actualizado', 'success')
          document.getElementById('btncerrar').click()
          setProductos([...productos, parametro])
        }
      }
    }).catch(function (error) {
      // Si ocurre un error, muestra una alerta de error y loguea el error en la consola
      show_alerta('Error en la solicitud', 'error');
      console.log(error);
    })
  }

  const deleteProducto = (id, nombre) => {
    // Crea una instancia de SweetAlert2 con soporte para React
    const MySwal = withReactContent(Swal)

    // Muestra una alerta con el mensaje y el icono proporcionados y ...
    MySwal.fire({
      title: '¿Seguro de eliminar el producto' + nombre + ' ?',
      icon: 'question',
      text: 'No se podra dar marcha atras',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        setId(id)
        enviarSolicitud('DELETE', { id: id }, `http://localhost:8080/api/productos/${id}`)
      }
      else {
        show_alerta('El producto NO fue elimnado', 'info')
      }
    })
  }

  return (
    <div className='gestionProductos'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto mt-6'>
              <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#modalProductos">
                <i className='fa-solid fa-circle-plus'></i> Añadir
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-lg-2'>
            <div className='table-responsive'>
              {/* Corregir la etiqueta de apertura de la tabla */}
              <table className='table table-bordered'>
                {/* Encabezado de la tabla */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th></th>
                  </tr>
                </thead>
                {/* Cuerpo de la tabla */}
                <tbody className='table-group-divider'>
                  {productos.map((producto, i) => (
                    <tr key={producto.id}>
                      <td>{(i + 1)}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.descripcion}</td>
                      <td>${new Intl.NumberFormat("es-mx").format(producto.precio)}</td>
                      <td className='d-flex align-items-center'>
                        {/* Editar */}
                        <button onClick={() => openModal(2, producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen)}
                          className='btn btn-warning me-2' data-bs-toggle='modal' data-bs-target='#modalProductos'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        {/* Eliminar */}
                        <button onClick={() => deleteProducto(producto.id, producto.nombre)} className='btn btn-danger'>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Ventana superpuesta que se utiliza para mostrar información adicional */}
      <div id='modalProductos' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            {/* Encabezado del modal */}
            <div className='modal-header'>
              {/* Título del modal */}
              <label className='h5'>{titulo}</label>
              {/* Botón de cierre del modal */}
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            {/* Cuerpo del modal */}
            <div className='modal-body'>
              {/* Input oculto para el id */}
              <input type='hidden' id='id'></input>

              {/* Input de nombre */}
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input
                  type='text'
                  id='nombre'
                  className='form-control'
                  placeholder='nombre'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></input>
              </div>

              {/* Input de descripción */}
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                <input
                  type='text'
                  id='descripcion'
                  className='form-control'
                  placeholder='Descripcion'
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                ></input>
              </div>

              {/* Input de precio */}
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                <input
                  type='text'
                  id='precio'
                  className='form-control'
                  placeholder='Precio'
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                ></input>
              </div>

              {/* Input de imagen */}
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-image'></i></span>
                <input
                  type='text'
                  id='imagen'
                  className='form-control'
                  placeholder='Imagen'
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                ></input>
              </div>
              <div className='d-grid col-e mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i>&nbsp;&nbsp;Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                id='btncerrar'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                style={{ backgroundColor: 'gray' }}>Cerrar
              </button>
            </div>


          </div>
        </div>
      </div>

    </div>
  )
}
