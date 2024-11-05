import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './styles/Ganadores.css';

const Ganadores = () => {
    const [ganadores, setGanadores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const obtenerGanadores = async () => {
        try {
            const response = await fetch('https://back-margarita.vercel.app/v1/margarita/ganadores', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '❌ Error al obtener los ganadores ❌');
            }

            setGanadores(data.ganadores); // Asegúrate de que esta propiedad es correcta
        } catch (error) {
            console.error("Error al obtener ganadores:", error);
            setMensaje(error.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerGanadores();
    }, []);

    return (
        <div className="ganadores-container">
            <h2>🏆 Ganadores de Premios 🏆</h2>
            {cargando ? (
                <div className="loader">🔄 Cargando...</div>
            ) : (
                <>
                    {mensaje && <p className="mensaje-error">{mensaje}</p>}
                    <table>
                        <thead>
                            <tr>
                                <th>ID de Usuario</th>
                                <th>Código</th>
                                <th>Monto</th>
                                <th>Fecha y Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ganadores.length === 0 ? (
                                <tr>
                                    <td colSpan="4">No hay ganadores registrados.</td>
                                </tr>
                            ) : (
                                ganadores.map((ganador) => (
                                    <tr key={ganador.userId}>
                                        <td>{ganador.userId}</td>
                                        <td>{ganador.codigo}</td>
                                        <td>${ganador.monto}</td>
                                        <td>{new Date(ganador.fecha).toLocaleString('es-CO')}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </>
            )}
            <button onClick={() => navigate(-1)} className="regresar-button">
                Regresar
            </button>
        </div>
    );
};

export default Ganadores;
