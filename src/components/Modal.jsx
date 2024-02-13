import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

export default function BasicModal() {
  // Estado para controlar si el modal está abierto o cerrado
  const [open, setOpen] = React.useState(false);

  // Función para abrir el modal
  const handleOpen = () => setOpen(true);

  // Función para cerrar el modal
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Botón para abrir el modal */}
      <Button onClick={handleOpen} variant='contained' color='primary' size='large' className='font-medium'>Comprar producto</Button>
      
      {/* Modal */}
      <Modal open={open}>
        <Box sx={style}>
          {/* Título del modal */}
          <Typography variant="h5" component="h2" textAlign="center" fontWeight="bold" mb={2}>
            Comprar Producto
          </Typography>

          {/* Formulario dentro del modal */}
          <form>
            <TextField id="nombre" label="Nombre" fullWidth margin="normal" />
            <TextField id="apellido" label="Apellido" fullWidth margin="normal" />
            <TextField id="email" label="Email" type="email" fullWidth margin="normal" />
            <TextField id="tarjeta-numero" label="Número de tarjeta" fullWidth margin="normal" />
            
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
