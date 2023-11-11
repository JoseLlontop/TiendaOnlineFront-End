import React from 'react'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alerta } from '../helpers/funcionSweetAlert'
import { useFetchData } from "../hooks/useFetchData"
import '../pages/pages.css'
import { document } from 'postcss'

export const CrudProducto = () => {

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


  return (
    <div className='CrudProductos'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#modalProductos">
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
                      <td>
                        {/*Cuando hace click en el icono de editar se muestra con los valores del producto que quiere modificar*/}
                        <button onClick={()=> openModal(2, producto.id, producto.nombre, producto.descripcion, producto.precio)}
                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProductos'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button className='btn btn-danger'>
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
      <div id='modalProductos' className='modal fade' aria-hidde='true'>
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
                <button className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i>&nbsp;&nbsp;Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                style={{ backgroundColor: 'gray' }} /* Puedes ajustar el color según tus preferencias */
              >
                Cerrar
              </button>
            </div>


          </div>
        </div>
      </div>

    </div>
  )
}
