import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ModalCompra } from "../components/Modal";

// context
import { ProductContext } from "../contexts/ProductContext";

export const ProductDetails = () => {
  // obtener el id del producto por medio de la url
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  
  //Creamos el modal de comprar un producto
  // const [modal,setModal] = useState(false);
  // const Toggle = () => setModal(!modal);
  
  
  // Obtener el producto basado en el id
  const product = products.find((item) => item.id === parseInt(id));
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Cargando...
      </section>
    );
  }

  // Desestructurar el producto
  const { nombre, descripcion, precio, imagen } = product;
  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* imagen */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-sm"
              src={imagen}
              alt={nombre}
            />
          </div>
          {/* texto */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {nombre}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6">
              $ {precio}
            </div>
            <p className="mb-8">{descripcion}</p>
            
            {/* <Modal show={modal} title="My Modal" close={Toggle}/> */}
            <ModalCompra></ModalCompra>
          </div>
        </div>
      </div>
    </section>
  );
};
