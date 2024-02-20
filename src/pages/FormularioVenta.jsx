import React, { useState, useEffect } from "react";
import axios from 'axios';
export const FormularioVenta = () =>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastname] = useState("");
    const [cbu,setCbu] = useState("");
    const [provincia,setProvincia] = useState("");
    const [domicilio,setDomicilio] = useState("");
    const [message, setMessage] = useState("");
    const [errorInput, setErrorInput] = useState(false);
    const fecha = new Date();
    const ActualDate = fecha.getDate;


    const handleSubmit = (e) => {
        e.preventDefault();

        if ([email, name, lastName, domicilio, provincia, cbu].includes("")) {
            setErrorInput(true);
            setTimeout(() => {
                setErrorInput(false);
            }, 5000);

        } else {

            const venta = {
                nombre: name,
                apellido: lastName,
                fecha: ActualDate,
                direccion_entrega: domicilio,
                cbu: cbu,
                email: email
            };
        
                axios.post('http://localhost:8080/api/ventas', {
                    venta: venta
                })
                .then(response => {
                    setMessage('Venta registrada exitosamente');

                    setTimeout(() => {
                        window.location.reload(); // Recargar la página 
                    }, 7000);
                })
                .catch(error => {
                    setMessage('Error al registrar venta');
                    console.error('Error:', error);
                });
        }

        setTimeout(() => {
            window.location.reload(); // Recargar la página 
        }, 5000);
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
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
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
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
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
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-cbu"
                >
                    Ingrese su CBU:
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-cbu"
                    type="text"
                    placeholder="correo@correo.com"
                    value={cbu}
                    onChange={(e) => setCbu(e.target.value)}
                    
                />
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
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
                        value={provincia}
                        onChange={(e) => setProvincia(e.target.value)}
                        
                    />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
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