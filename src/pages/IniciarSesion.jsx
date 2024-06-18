import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const IniciarSesion = () => {
    
    const navigate = useNavigate();

    const handleNavigateToValidacion = () => {
        // Almacena el tipo de usuario en localStorage
        localStorage.setItem('tipoUsuario', 'proveedor');

        // Redirige al usuario al sistema de validación
        window.location.href = "https://colosal.duckdns.org:15001/SRVP/?client=shopify";  
    };

    const handleNavigateToRegistro = () => {
        // Redirige al usuario a la página de registro
        navigate("/Registrarse");
    };

    const handleNavigateToGestionProductos = () => {
        // Redirige al usuario directamente a la página de gestión de productos
        navigate("/GestionProductos");
    };

    return (
        <>
            <div className="mt-[140px] sm:mt-20 max-w-screen-md mx-auto p-5">

                <div className="text-center mb-10">
                    <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Sistema de <span className="text-indigo-600">Validación</span>
                    </h3>
                </div>

                <div className="mb-4">
                    <p className="font-bold text-lg text-gray-800 mb-2">Pasos para poder gestionar productos:</p>
                    <ol className="list-decimal ml-8">
                        <li>Regístrate como proveedor.</li>
                        <p className="text-sm text-gray-600 mb-2.5">
                            Nota: Esta opción solo se deberá realizar una única vez.
                        </p>
                        <li>Regístrate en el sistema de validación de personas.</li>
                        <p className="text-sm text-gray-600 mb-2">
                            Nota: Esta opción se deberá realizar siempre que quiera acceder a la gestión de producto.
                        </p>
                    </ol>
                </div>
         
                <p className="font-bold text-lg text-gray-800 mb-3 text-center">Regístrate como proveedor</p>
                <div className="mb-4 flex justify-center">
                    <button
                        className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                        onClick={handleNavigateToRegistro}
                    >
                        Registrarme ahora
                    </button>
                </div>

                <p className="font-bold text-lg text-gray-800 mb-3 text-center mt-2">Regístrate en el sistema de validación de personas</p>
                <div className="flex justify-center mb-5">
                    <button
                        className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                        onClick={handleNavigateToValidacion}
                    >
                        Ir al Sistema de Validación
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-700">
                        Debido a que el sistema de validación externo fue construido en la facultad y podría no estar disponible en todo momento, hemos agregado un acceso directo a la página de gestión de productos.
                    </p>
                    <p className="text-gray-700 mb-4">
                        Puedes usar este botón para acceder directamente a la gestión de productos sin pasar por los controles de validación.
                    </p>
                    <div className="flex justify-center">
                        <button
                            className="shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                            onClick={handleNavigateToGestionProductos}
                        >
                            Acceso Directo a Gestión de Productos
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
