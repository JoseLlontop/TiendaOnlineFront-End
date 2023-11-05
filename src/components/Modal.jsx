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
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const campo = {
  
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
        <Box sx={style} >
          <Typography fontFamily="Lucida" textAlign="center" fontSize="2rem">
            Comprar Producto
          </Typography>
          <Typography id="modal-modal-description"sx={{ mt: 2 }}>
            <Box marginBottom="2rem" fontSize="1.2rem" sx={campo} borderColor="grey">
              <Box  marginBottom="2rem">
                <label htmlFor="" >Nombre: </label>
                <input type="text" id='nombre' className='campos' />
              </Box>
              <Box marginBottom="2rem">
                <label htmlFor="">Apellido: </label>
                <input type="text" id='apellido' className='campos'/>
              </Box>
              <Box marginBottom="2rem">
                <label htmlFor="">Email: </label>
                <input type="email" id='email' className='campos'/>
              </Box>
              <Box marginBottom="2rem">
                <label htmlFor="">Numero de tarjeta:</label>
                <input type="text" id='tarjeta-numero' className='campos'/>
              </Box>
              <Box>
                <label htmlFor="">Domicilio:</label>
                <input type="text" id='domicilio' className='campos'/>
              </Box>
            </Box>
            <Box >
                <Button
                variant='contained'
                color="primary"
                onClick={() => handleClose()}
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