import React, { useState } from 'react';
import './styles/NewAdmin.css'; // Asegúrate de que esta línea esté correcta
import { useNavigate } from 'react-router-dom'; // Para redirigir

const NewAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate(); // Para la redirección

    const handleRegister = async (event) => {
        event.preventDefault(); // Evitar el recargo de la página

        const datos = { username, password };

        try {
            const response = await fetch('https://back-margarita.vercel.app/v1/margarita/registeradmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '❌ Error en el registro, intenta de nuevo ❌');
            }

            setMensaje(data.message);
            setTimeout(() => {
                navigate('/admin'); // Redirige al área de administración después de registrar
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            setMensaje(error.message);
        }
    };

    return (
        <div className="new-admin-container">
            <h2 className="new-admin-title">Registrar Nuevo Administrador</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa el nombre de usuario"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa la contraseña"
                        required
                    />
                </div>
                <button className="register-button" type="submit">Registrar Administrador</button>
                <button className="back-button" type="button" onClick={() => navigate('/admin')}>Regresar al Login</button>
                {mensaje && (
                    <p className={mensaje.includes('Éxito') ? 'mensaje-exito' : 'mensaje-error'}>
                        {mensaje}
                    </p>
                )}
            </form>
        </div>
    );
};

export default NewAdmin;