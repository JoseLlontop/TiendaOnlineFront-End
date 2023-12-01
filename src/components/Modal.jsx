import * as React from 'react';
import Box from '@mui/material/Box';
import Styles from './styles.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#5bc0de',
  border: '12px solid #000 ',
  boxShadow: 24,
  p: 4, 
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className=" py-4 px-8 text-white">
      <Button onClick={handleOpen}
      variant='contained'
      color='primary'
      size='large'
      >Comprar producto</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontFamily="Lucida" textAlign="center" fontSize="2rem" >
            Comprar Producto
          </Typography>
          <Typography id="modal-modal-description"sx={{ mt: 2 }}>
            <Box  >
              <Box   className='formulario'>
                <label htmlFor="" >Nombre: </label>
                <input type="text" id='nombre' className='campos' placeholder='Ingrese su nombre'/>
              </Box>
              <Box  className='formulario'>
                <label htmlFor="">Apellido: </label>
                <input type="text" id='apellido' className='campos' placeholder='Ingrese su apellido'/>
              </Box>
              <Box className='formulario'>
                <label htmlFor="">Email: </label>
                <input type="email" id='email' className='campos' placeholder='Ingrese su email'/>
              </Box>
              <Box className='formulario'>
                <label htmlFor="">Numero de tarjeta: </label>
                <input type="text" id='tarjeta-numero' className='campos'placeholder='Ingrese su numero de tarjeta'/>
              </Box>
              <Box className='formulario'>
                <label htmlFor="">Localidad: </label>
                <select name="localidad" id="localidad" className='campos' defaultValue="default">
                  <option value="default" disabled>Seleccione su localidad</option>
                  <option value="buenosAires">Buenos Aires</option>
                  <option value="catamarca">Catamarca</option>
                  <option value="mendoza">Mendoza</option>
                  <option value="cordoba">Cordoba</option>
                  <option value="laRioja">La Rioja</option>
                  <option value="tucuman">Tucuman</option>
                  <option value="sanJuan">San juan</option>
                  <option value="misiones">Misiones</option>
                  <option value="rioNegro">Rio Negro</option>
                  <option value="tierraDelFuego">Tierra Del Fuego</option>
                  <option value="entreRios">Entre Ríos</option>
                </select>
              </Box>
              <Box className='formulario'>
                <label htmlFor="">Domicilio: </label>
                <input type="text" id='domicilio' className='campos'placeholder='Ingrese su domicilio'/>
              </Box>
            </Box>
            <Box>
                <Button
                variant='contained'
                color="primary"
                onClick={() => handleClose()}
                style={{ marginRight: '8px' }} 
                >
                  Cancelar
                </Button>
              <Button variant="contained" 
              color="primary"
              >
                Aceptar
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}