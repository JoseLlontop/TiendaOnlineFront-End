import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  boxShadow: 24,
  p: 4, 
};


export const ModalCompra = () => {
  // Estado para controlar si el modal está abierto o cerrado
  const handleSubmit = async (e) => {
    const [formData, setFormData] = useState({
      nombre: '',
      apellido: '',
      email: '',
      tarjetanumero: '',
      localidad: "",
      domicilio: ""
    });
    e.preventDefault();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const [message, setMessage] = useState('');
    try {
      // Enviar los datos al servidor del broker
      const response = await fetch('URL_DEL_BROKER', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      
      // Verificar si la transacción fue exitosa
      if (response.ok) {
        setMessage('Transacción exitosa');
      } else {
        setMessage(data.message); // En caso de error, mostrar el mensaje del servidor
      }
    } catch (error) {
      console.error('Error al procesar la transacción:', error);
      setMessage('Error al procesar la transacción. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

    const handleNavigateToValidacion = () => {
        // Redirige al usuario al sistema de validación
        navigate("/ValidacionVenta");
    };
  // Función para abrir el modal
  const handleOpen = () => setOpen(true);


  // Función para cerrar el modal
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button onClick={handleNavigateToValidacion} variant='contained' color='primary' size='large' className='font-medium'>Comprar producto</Button>
      <Button onClick={handleOpen} variant='contained' color='primary' size='large' className='font-medium'>Comprar producto</Button>
      {/* Modal */}
      <Modal open={open}>
        <Box sx={style}>
          {/* Título del modal */}
          <Typography variant="h5" component="h2" textAlign="center" fontWeight="bold" mb={2}>
            Comprar Producto
          </Typography>

          {/* Formulario dentro del modal */}
          <form onSubmit={handleSubmit}>
            <TextField id="nombre" label="Nombre" fullWidth margin="normal" required />
            <TextField id="apellido" label="Apellido" fullWidth margin="normal" required/>
            <TextField id="email" label="Email" type="email" fullWidth margin="normal" required/>
            <TextField id="tarjetaNumero" label="Número de tarjeta" fullWidth margin="normal" required/>
            
            {/* Selector de localidad */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="localidad-label">Localidad</InputLabel>
              <Select
                labelId="localidad-label"
                id="localidad"
                defaultValue=""
                label="Localidad"
              >
                <MenuItem value="buenosAires">Buenos Aires</MenuItem>
                {/* Otras opciones de localidad */}
              </Select>
            </FormControl>

            {/* Campo de domicilio */}
            <TextField id="domicilio" label="Domicilio" fullWidth margin="normal" />

            {/* Botones para cerrar y aceptar */}
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={handleClose} color="primary" variant="contained" style={{ marginRight: '8px' }}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Aceptar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
