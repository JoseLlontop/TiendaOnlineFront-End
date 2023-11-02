import React from 'react';
import { useState } from "react";

export const Registrarse = () => {
    const [email, setEmail] = useState("");
    const [name,setName] = useState("");
    const [lastName,setLastname] = useState("");
    const [cuil,setCuil] = useState("");
    const [password, setPassword] = useState("");
    const [rol,setRol] = useState("");
  
    const [errorInput, setErrorInput] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if ([email, password].includes("")) {
        setErrorInput(true);
  
        setTimeout(() => {
          setErrorInput(false);
        }, 5000);
      }
    };
  return (
    <>
      <div className="mt-[140px] sm:mt-20 max-w-screen-md mx-auto p-5">
        {errorInput && (
          <div className="bg-red-500 text-white font-medium text-center py-2 rounded mb-5">
            <strong>¡Error!</strong>
            <br />
            Tienes que llenar todos los campos.
          </div>
        )}
        <div className="text-center mb-10">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            <span className="text-indigo-600">Registrarse</span>
          </h3>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>

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
                htmlFor="grid-password"
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
                htmlFor="grid-cuil"
              >
                Cuil:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-cuil"
                type="text"
                placeholder="Ingrese su CUIL"
                value={cuil}
                onChange={(e) => setCuil(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Contraseña:
              </label>
              <input
                rows="1"
                type="password"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Es proveedor o cliente:
              </label>
              <select
               name="rol"
               rows="1"
               id="grid-rol"
               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
               value={rol}
               onChange={(e) => setRol(e.target.value)}
               >
                <option value=""
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                >Cliente</option>
                <option value=""
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                >Proveedor</option>
              </select>
            </div>
          </div>
            <div className="flex justify-center w-full px-3">
              <button
                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                type="submit"
              >
                Registrarse
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

