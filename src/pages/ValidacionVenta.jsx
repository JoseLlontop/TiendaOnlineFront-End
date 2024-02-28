import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ValidacionVenta = () => {
    
    const navigate = useNavigate();

    const handleNavigateToValidacion = () => {

        // Almacena el tipo de usuario en localStorage
        localStorage.setItem('tipoUsuario', 'cliente');

        // Redirige al usuario al sistema de validación
        window.location.href = "https://colosal.duckdns.org:15001/SRVP/?client=shopify";
        
    };

    const handleNavigateToRegistro = () => {
        // Redirige al usuario a la página de registro
        navigate("/Registrarse");

    };

    return (
        <>
            <div className="mt-[140px] sm:mt-20 max-w-screen-md mx-auto p-5">

            <div className="text-center mb-10">
                <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Sistema de <span className="text-indigo-600">Validacion</span>
                </h3>
            </div>

            <div className="mb-4">
              <p className="font-bold text-lg text-gray-800 mb-2">Pasos para poder comprar un producto:</p>
              <ol className="list-decimal ml-8">
                  <li>Regístrate como cliente.</li>
                    <p className="text-sm text-gray-600 mb-2.5">
                      Nota: Esta opcion solo de debera realizar una unica vez.
                    </p>
                  <li>Regístrate en el sistema de validación de personas.
                      <p className="text-sm text-gray-600 mb-2">
                      Nota: Esta opcion se debera realizar siempre que quiera acceder a la compra un producto .
                      </p>
                  </li>
              </ol>
            </div>
         
             
            <p className="font-bold text-lg text-gray-800 mb-3 text-center">Regístrate como cliente</p>

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