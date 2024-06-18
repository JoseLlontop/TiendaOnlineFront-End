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
  const URL = import.meta.env.VITE_API_URL;

  const { data, isLoading } = useFetchData(`${URL}/api/productos`);

  const [productos, setProductos] = useState([]);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [operacion, setOperacion] = useState(1);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setProductos(data);
      console.log(data);
    }
  }, [data, isLoading]);

  const openModal = (op, id, nombre, descripcion, precio, imagen) => {
    setId('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagen('');
    setOperacion(op);

    if (op == 1) {
      setTitulo('Registrar Producto');
    } else if (op == 2) {
      setTitulo('Editar Producto');
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setPrecio(precio);
      setImagen(imagen);
    }

    window.setTimeout(() => {
      document.getElementById('nombre').focus();
    }, 500);
  }

  const validar = () => {
    let productoParametro;
    let metodo;
    let direccion;

    if (nombre.trim() === '') {
      show_alerta('Escriba el nombre del producto', 'warning');
    } else if (precio.trim() === '') {
      show_alerta('Escribe el precio del producto', 'warning');
    } else if (!imagen) {
      show_alerta('Seleccione una imagen para el producto', 'warning');
      
    } else {
      if (operacion === 1) {
        productoParametro = { nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio.trim(), imagen: imagen.trim() };
        metodo = 'POST';
        direccion = `${URL}/api/productos`;
      } else {
        productoParametro = { id: id, nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio.trim(), imagen: imagen.trim() };
        metodo = 'PUT';
        direccion = `${URL}/api/productos/${productoParametro.id}`;
      }
      enviarSolicitud(metodo, productoParametro, direccion);
    }
  }

  const enviarSolicitud = async (metodo, parametro, direccion) => {
    await axios({ method: metodo, url: direccion, data: parametro }).then((respuesta) => {
      if (respuesta.status === 200) {
        document.getElementById('btncerrar').click();

        if (metodo === 'DELETE') {
          show_alerta('Producto eliminado', 'success');
          setProductos(productos.filter(producto => producto.id !== id));
        } else if (metodo === 'POST') {
          show_alerta('Producto guardado', 'success');
          setProductos([...productos, parametro]);
        } else {
          show_alerta('Producto actualizado', 'success');
          setProductos(productos.map(p => (p.id === parametro.id ? parametro : p)));
        }
      }
    }).catch((error) => {
      show_alerta('Error en la solicitud', 'error');
      console.log(error);
    });
  }

  const deleteProducto = (id, nombre) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: `¿Seguro de eliminar el producto ${nombre}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((respuesta) => {
      if (respuesta.isConfirmed) {
        setId(id);
        enviarSolicitud('DELETE', { id: id }, `${URL}/api/productos/${id}`);
      } else {
        show_alerta('El producto NO fue eliminado', 'info');
      }
    });
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      setImagen(data.url);

      console.log("Imagen recibida y guardada correctamente en el BUCKET: ", data.url);

    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

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
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {productos.map((producto, i) => (
                    <tr key={producto.id}>
                      <td>{i + 1}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.descripcion}</td>
                      <td>${new Intl.NumberFormat("es-mx").format(producto.precio)}</td>
                      <td className='d-flex align-items-center'>
                        <button onClick={() => openModal(2, producto.id, producto.nombre, producto.descripcion, producto.precio, producto.imagen)}
                          className='btn btn-warning me-2' data-bs-toggle='modal' data-bs-target='#modalProductos'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
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

      <div id='modalProductos' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{titulo}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>

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

              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-image'></i></span>
                <input
                  type='file'
                  id='imagen'
                  className='form-control'
                  accept='image/*'
                  onChange={handleFileChange}
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
