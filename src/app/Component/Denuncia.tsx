import React, { useState, FormEvent } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelIcon from '@mui/icons-material/Cancel';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { styled } from '@mui/material/styles';

interface DenunciaProps {
    closeModal: () => void;
}

const Denuncia: React.FC<DenunciaProps> = ({ closeModal }) => {
    const [denuncia, setDenuncia] = useState('');
    const [ratingValue, setRatingValue] = useState<number | null>(3); // Valor inicial para el Rating

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Lógica para enviar la denuncia al backend
        console.log('Denuncia enviada:', denuncia);
        console.log('Valoración:', ratingValue); // Guardar valoración en el estado local
        closeModal(); // Cerramos el modal después de enviar la denuncia
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDenuncia(event.target.value);
    };

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: theme.palette.action.disabled,
        },
    }));

    const customIcons: {
        [index: string]: {
            icon: React.ReactElement;
            label: string;
        };
    } = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon color="error" />,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon color="error" />,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon color="warning" />,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon color="success" />,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon color="success" />,
            label: 'Very Satisfied',
        },
    };

    function IconContainer(props: IconContainerProps) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    return (
        <div>
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto max-w-lg mx-auto my-6">
                    {/* Contenido del modal */}
                    <div className="relative bg-white rounded shadow-lg outline-none focus:outline-none">
                        {/* Cabecera del modal */}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <blockquote>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">Cuentanos tu Experiencia con el Prestador</p>
                            </blockquote>
                                <div className="mb-4">
                                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                                    <StyledRating
                                        name="rating"
                                        defaultValue={3}
                                        IconContainerComponent={IconContainer}
                                        getLabelText={(value: number) => customIcons[value].label}
                                        value={ratingValue}
                                        onChange={(event, newValue) => {
                                            setRatingValue(newValue);
                                        }}
                                    />
                                </div>
                        </div>
                        {/* Cuerpo del modal */}
                        <div className="relative p-6 flex-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="denuncia" className="block text-sm font-medium text-gray-700">
                                        Cuentanos un poco
                                    </label>
                                    <textarea
                                        id="denuncia"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        rows={3}
                                        placeholder="Escribe tu experiencia aquí..."
                                        value={denuncia}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                {/* RadioGroup para la valoración */}
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="rounded text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium text-sm px-2 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                                        onClick={closeModal}
                                    >
                                        <CancelIcon className='mr-1' />
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium text-sm px-3 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-3 mb-2"
                                    >
                                        Enviar
                                        <ArrowForwardIcon className='ms-1' />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Fondo del modal */}
            <div className="fixed inset-0 bg-black opacity-25"></div>
        </div>
    );
};

export default Denuncia;





// try {
//     // Realizar la solicitud PUT a la API con la información de la denuncia
//     const response = await fetch('api/handlerafiliado', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ denuncia }),
//     });

//     if (response.ok) {
//       // Realizar alguna acción si la solicitud es exitosa
//       setSuccess(true);
//     } else {
//       // Manejar errores de la solicitud
//       setError('Error al enviar la denuncia');
//     }
//   } catch (error) {
//     // Manejar errores de red u otros errores
//     setError('Error al enviar la denuncia: ' + error.message);
//   } finally {
//     setLoading(false);
//   }
// };
