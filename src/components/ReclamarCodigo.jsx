import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de reclamar el código
import './styles/ReclamarCodigo.css'; // Importa el archivo CSS para estilos

const ReclamarCodigo = ({ userId }) => {
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false); // Estado para manejar el cargando
    const [historial, setHistorial] = useState([]); // Estado para el historial
    const navigate = useNavigate(); // Para la redirección

    const handleReclamar = async (event) => {
        event.preventDefault(); // Evitar que el formulario se recargue

        if (!userId) {
            setMensaje("❌ Debes estar autenticado para reclamar el código ❌");
            return;
        }

        const datos = { userId, codigo };
        setCargando(true); // Mostrar indicador de carga

        try {
            const response = await fetch('https://back-margarita.vercel.app/v1/margarita/reclamar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '❌ Error en el reclamo, intenta de nuevo ❌');
            }

            setMensaje(data.message);
            setCodigo(''); // Limpiar el campo del código tras un reclamo exitoso
            await obtenerHistorial(userId);
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            setMensaje(error.message);
        } finally {
            setCargando(false); // Ocultar indicador de carga
        }
    };

    const obtenerHistorial = async (userId) => {
        try {
            const response = await fetch(`https://back-margarita.vercel.app/v1/margarita/historial/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '❌ Error al obtener el historial ❌');
            }

            setHistorial(data.historial);

        } catch (error) {
            console.error("Error al obtener el historial:", error);
            setMensaje(error.message);
        }
    };

    useEffect(() => {
        if (userId) {
            obtenerHistorial(userId);
        }
    }, [userId]);

    return (
        <div className="reclamar-container">
            <h2 className="reclamar-title">🎉 Reclama tu Código 🎉</h2>
            <form onSubmit={handleReclamar}>
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input
                        type="text"
                        id="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        placeholder="Ingresa el código"
                        required
                    />
                </div>
                <button className="reclamar-button" type="submit" disabled={cargando}>
                    {cargando ? 'Reclamando...' : 'Reclamar Código'}
                </button>
                {mensaje && (
                    <p className={mensaje.includes('Éxito') ? 'mensaje-exito' : 'mensaje-error'}>
                        {mensaje}
                    </p>
                )}
            </form>
            {cargando && <div className="loader">🔄 Cargando...</div>}

            {/* Sección para mostrar el historial de reclamos */}
            <div className="historial-container">
                <h3>Historial de Reclamos</h3>
                {historial.length === 0 ? (
                    <p>No hay reclamos registrados.</p>
                ) : (
                    <ul>
                        {historial.map((reclamo) => (
                            <li key={reclamo.codigo}>
                                Código: {reclamo.codigo}, Monto: ${reclamo.montoGanado}, Estado: {reclamo.estado}, Fecha: {new Date(reclamo.fechaReclamo).toLocaleString('es-CO')}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Botón para regresar */}
            <button className="reclamar-button" onClick={() => navigate(-1)}>
                ⬅️ Regresar
            </button>
        </div>
    );
};

export default ReclamarCodigo;
