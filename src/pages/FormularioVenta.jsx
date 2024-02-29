import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { ProductContext } from "../contexts/ProductContext";

export const FormularioVenta = () =>{

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastname] = useState("");
    const [cbu,setCbu] = useState("");
    const [cuil,setCuil] = useState("");
    const [localidad,setLocalidad] = useState("");
    const [domicilio,setDomicilio] = useState("");
    const [message, setMessage] = useState("");
    const [errorInput, setErrorInput] = useState(false);

    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    let ActualDate = `${dia}-${mes}-${año}`;
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [productos, setProductos] = useState([]);
    const [clienteID, setClienteID] = useState();


      useEffect(() => {
        // Llamada a la API para obtener la lista de productos
        axios.get("http://localhost:8080/api/productos")
          .then(response => {
            setProductos(response.data);
          })
          .catch(error => {
            console.error('Error al obtener los productos:', error);
          });
      }, []);


      const handleSubmit = async (e) => {
        e.preventDefault();
        const productoSeleccionado = productos.find((prod) => prod.id === parseInt(selectedProduct));
    
        const descripcionProducto = productoSeleccionado.descripcion;
    
        // Expresión regular para encontrar el CUIL
        const cuilRegex = /Cuil:\s*([\d-]+)/;
        const cuilMatch = descripcionProducto.match(cuilRegex);
        const cuil_proveedor = cuilMatch ? cuilMatch[1] : null;
    
        // Expresión regular para encontrar el CBU
        const cbuRegex = /CBU\s*para\s*pago:\s*([\d\s]+)/;
        const cbuMatch = descripcionProducto.match(cbuRegex);
        const cbu_proveedor = cbuMatch ? cbuMatch[1].replace(/\s/g, '') : null;
    
        console.log("Cuil del proveedor: ", cuil_proveedor)
        console.log("CBU del proveedor: ", cbu_proveedor)
    
        if ([email, name, lastName, domicilio, localidad, cbu, cuil].includes("")) {
            setErrorInput(true);
            setTimeout(() => {
                setErrorInput(false);
            }, 5000);
        } else {
    
            try {
                // Realizar la solicitud para buscar el cliente
                const response = await axios.get('http://localhost:8080/api/clientes/buscar', {
                    params: {
                        nombre: name,
                        apellido: lastName,
                        email: email
                    }
                });
    
                // Obtener el ID del cliente desde la respuesta
                const clienteIDEncontrado = response.data;
                console.log('ID del cliente encontrado:', clienteIDEncontrado);
    
                console.log(selectedBank);
    
                // Armar el objeto de transacción
                const transaction = {
                    origin_cbu: cbu,
                    amount: parseFloat(productoSeleccionado.precio),
                    destination_cbu: cbu_proveedor,
                    motive: "Compra de producto",
                    number: null,
                    origin_cuil: parseInt(cuil),
                    destination_cuil: parseInt(cuil_proveedor)
                };

                console.log(transaction)
    
                // Realizar la solicitud para la transacción solo si el banco seleccionado es "Tomorrow Onrender"
                if (selectedBank === "Tomorrow Onrender") {
                    
                    const response = await fetch("http://localhost:8080/api/realizarTransaccion", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(transaction)
                    });

                    console.log(response);

                    if (response.ok == true) {

                        console.log("La transaccion fue exitosa");

                        const datos = await response.json();

                        console.log(datos);
    
                        // Si la transacción es exitosa, proceder con el alta de la venta
                        // Obtener la fecha actual
                        const fechaActual = new Date();
    
                        // Formatear la fecha como 'yyyy-MM-dd'
                        const formattedDate = fechaActual.toISOString().split('T')[0];
    
                        // Armar la venta
                        const venta = {
                            fecha: formattedDate,
                            monto_total: productoSeleccionado.precio,
                            direccion_entrega: domicilio,
                            cliente: { usuario_ID: clienteIDEncontrado },
                            producto: { id: productoSeleccionado.id }
                        };
    
                        console.log("Venta:", venta);
    
                        // Realizar la solicitud para crear la venta
                        await axios.post('http://localhost:8080/api/ventas', venta);
    
                        setMessage('Venta registrada exitosamente');
    
                        setTimeout(() => {
                            window.location.reload(); // Recargar la página 
                        }, 7000);
                    } else {
                        setMessage('Error en la transacción');
                    }
                } else {
                    setMessage('Banco seleccionado incorrecto');
                }
    
            } catch (error) {
                setMessage('Error al registrar venta');
                console.error('Error:', error);
            }
        }
    };
    
    return (
        <div className="mt-[140px] sm:mt-20 max-w-screen-md mx-auto p-5">
            {message && (
                        <div className={`${message.includes('exitosamente') ? 'bg-green-500 text-white font-medium text-center py-2 rounded mb-3' :
                        'bg-red-500 text-white font-medium text-center py-2 rounded mb-3'}`}>
                            {message}
                        </div>
                    )}

            {errorInput && (
                    <div className="bg-red-500 text-white font-medium text-center py-2 rounded mb-3">
                        <strong>¡Error!</strong>
                        <br />
                        Tienes que llenar todos los campos.
                    </div>
                )}
            <form className="w-full" onSubmit={handleSubmit} >
                <div className="text-center mb-10">
                        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                            Completar<span className="text-indigo-600">Compra</span>
                        </h3>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-rol"
                                >
                                    Producto a comprar:
                                </label>
                        <select 
                        value={selectedProduct} 
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="">Selecciona un producto</option>
                                {productos.map((prod) => (
                                <option key={prod.id} value={prod.id}>{prod.nombre} ---  ${prod.precio}</option>
                                ))}
                        </select>
                        {selectedProduct && (
            <>
                        <p>Producto: {productos.find((prod) => prod.id === parseInt(selectedProduct)).nombre}</p>
                        <p className="ml-12 mb-4">Precio: ${productos.find((prod) => prod.id === parseInt(selectedProduct)).precio}</p>
                        
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-name"
                                
                            >
                                Nombre
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-name"
                                type="text"
                                placeholder="Ingrese su nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                
                            />
                        
                        </div>

                    

                    
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Apellido:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="Ingrese su apellido"
                                value={lastName}
                                onChange={(e) => setLastname(e.target.value)}
                                
                                
                            />
                        
                    </div>

                    
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-email"
                            >
                                Correo Electrónico:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-email"
                                type="email"
                                placeholder="correo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                
                            />
                        
                    </div>

                    <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-cbu"
                            >
                                Seleccionar Banco:
                            </label>
                            <select 
                            value={selectedBank} 
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="" disabled>Selecciona un banco</option>
                                <option value="Tomorrow Onrender">Tomorrow Onrender</option>
                            </select>
                        
                    </div>
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-cbu"
                            >
                                CBU:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-cbu"
                                type="text"
                                placeholder="Ingrese su CBU"
                                value={cbu}
                                onChange={(e) => setCbu(e.target.value)}
                                
                            />
                        
                    </div>
                    
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-cuil"
                            >
                                Cuil:
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-cuil"
                                type="number"
                                placeholder="Ingrese su cuil"
                                value={cuil}
                                onChange={(e) => setCuil(e.target.value)}
                                
                                
                            />
                       
                    </div>
                        
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-localidad"
                                >
                                    Localidad:
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-localidad"
                                    type="text"
                                    placeholder="Ingrese localidad"
                                    value={localidad}
                                    onChange={(e) => setLocalidad(e.target.value)}
                                    
                                />
                            
                        </div>

                        
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-domicilio"
                                >
                                    Domicilio:
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-domicilio"
                                    type="text"
                                    placeholder="Ingrese su domicilio"
                                    value={domicilio}
                                    onChange={(e) => setDomicilio(e.target.value)}
                                    
                                />
                            
                        </div>
                                </>
                            )}
                            </div>
            
            
            <div className="flex justify-center w-full px-3">
                <button
                    className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                    type="submit"
                >
                    Finalizar Compra
                </button>
            </div>
        </form>
    </div>
    )
}