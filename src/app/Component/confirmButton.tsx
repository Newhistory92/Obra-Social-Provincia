import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const ConfirmButton = ({ selectedUser, selectedType, inputValue, onClick }) => {

  const handleConfirmClick = async () => {
    try {
      if (!selectedUser) {
        return;
      }
  
      let additionalFields = {};
  
      switch (selectedType) {
        case 'AFILIADOS':
          additionalFields = { dni: inputValue };
          break;
        case 'OPERADORES':
          additionalFields = { numeroOperario: inputValue };
          break;
        case 'PRESTADORES':
          additionalFields = { 
            numeroMatricula: selectedUser.matricula,
            especialidad: selectedUser.especialidad 
          };
          break;
        default:
          break;
      }
  
      if (Object.keys(additionalFields).length === 0) {
        console.error('Tipo de usuario no válido');
        return;
      }
      
      const getApiRoute = (selectedType) => {
        switch (selectedType) {
          case 'AFILIADOS':
            return '/api/handlerafiliado';
          case 'OPERADORES':
            return '/api/handleroperario';
          case 'PRESTADORES':
            return '/api/handlerprestador';
          default:
            throw new Error('Tipo de usuario no válido');
        }
      };
  
      const userWithAdditionalFields = { ...selectedUser, ...additionalFields };
  
      const response = await fetch(getApiRoute(selectedType), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithAdditionalFields), // Envía los datos del usuario seleccionado con los campos adicionales
      });
  
      if (response.ok) {
        // Si la solicitud fue exitosa, ejecuta la acción proporcionada por el prop onClick
        onClick();
      } else {
        // Si hubo un error en la solicitud, muestra un mensaje de error en un toast
        toast.error('Error al realizar la acción. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Si hubo un error en la lógica, muestra un mensaje de error en un toast
      toast.error('Error interno. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <Button
      id="confirmButton"
      className="mt-2"
      fullWidth
      onClick={handleConfirmClick}
    >
      Confirmar
    </Button>
  );
}

export default ConfirmButton;
