import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Hero, Product } from "../components";
import { useLocation } from 'react-router-dom';

export const Home = () => {
  const { products } = useContext(ProductContext);
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  const CLIENTE_ID = "BNFI-DFDF-DFDF-DF45";
  const CLIENTE_SECRET = "miContraseña";

  const obtenerParametroDeURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('parametro');
  };

  /*useEffect(() => {
    const parametro = obtenerParametroDeURL();
    if (parametro) {
      // Llamar a la API
      fetch("api/Auth/loguearJWT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          CLIENTE_ID,
          CLIENTE_SECRET,
          parametro
        })
      })
      .then(response => response.json())
      .then(data => {
        // Verificar si la llamada fue exitosa y decodificar el JWT
        if (data.exito) {
          const decodedData = jwt.verify(data.datos, 'tuClavePublica'); 
          setUserData(decodedData); // Almacenar los datos decodificados en el estado
        } else {
          console.error("Error al llamar a la API:", data.mensaje);
        }
      })
      .catch(error => {
        console.error("Error al llamar a la API:", error);
      });
    }
  }, [location.search]);*/

  return (
    <>
      <Hero />
      {userData && (
        <section className="py-16">
          <div className="container mx-auto">
            <h1 className="uppercase mb-6 font-bold text-2xl">
              Bienvenido, {userData.nombre} {userData.apellido}
            </h1>
            <p>Email: {userData.email}</p>
            <p>Estado crediticio: {userData.estadoCrediticio}</p>
          </div>
        </section>
      )}
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="uppercase mb-6 font-bold text-2xl">
            Nuestros Productos más vendidos
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};