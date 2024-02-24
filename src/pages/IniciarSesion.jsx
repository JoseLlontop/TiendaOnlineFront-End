import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'; // Importa la biblioteca para manejar cookies
import { useNavigate } from 'react-router-dom';

export const IniciarSesion = () => {
    
    const navigate = useNavigate();
    //const [proveedorRegistrado, setProveedorRegistrado] = useState(false);

    const handleNavigateToValidacion = () => {
        // Redirige al usuario al sistema de validación
        window.location.href = "https://colosal.duckdns.org:15001/SRVP/?client=rentail";
    };

    const handleNavigateToRegistro = () => {
        // Redirige al usuario a la página de registro
        navigate("/Registrarse");

    };

    /* Verifica si el usuario ha completado el primer paso (registro como proveedor)
    // basado en la presencia de la cookie
    const verificarRegistroProveedor = () => {
        const proveedorRegistradoCookie = Cookies.get("proveedorRegistrado"); // Obtiene el valor de la cookie
        if (proveedorRegistradoCookie) {
            setProveedorRegistrado(true);
        }
    };
    // Al cargar el componente, verifica si el usuario ha completado el registro como proveedor
    useEffect(() => {
        verificarRegistroProveedor();
    }, []);*/

    return (
        <>
            <div className="mt-[140px] sm:mt-20 max-w-screen-md mx-auto p-5">

            <div className="text-center mb-10">
                <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Sistema de <span className="text-indigo-600">Validacion</span>
                </h3>
            </div>

            <div className="mb-4">
              <p className="font-bold text-lg text-gray-800 mb-2">Pasos para poder gestionar productos:</p>
              <ol className="list-decimal ml-8">
                  <li>Regístrate como proveedor.</li>
                    <p className="text-sm text-gray-600 mb-2.5">
                      Nota: Esta opcion solo de debera realizar una unica vez.
                    </p>
                  <li>Regístrate en el sistema de validación de personas.
                      <p className="text-sm text-gray-600 mb-2">
                      Nota: Esta opcion se debera realizar siempre que quiera acceder a la gestion de producto.
                      </p>
                  </li>
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

            <p className="font-bold text-lg text-gray-800 mb-3 text-center mt-2">Registrate en el sistema de validación de personas</p>
            <div className="flex justify-center mb-5">
                <button
                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                onClick={handleNavigateToValidacion}
                >
                Ir al Sistema de Validación
                </button>
            </div>

         </div>
    </>
    );
};