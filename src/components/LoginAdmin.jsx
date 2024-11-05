import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginAdmin.css';

const LoginAdmin = ({ callback }) => { // Añadir callback aquí
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const datos = { username, password };

        try {
            const response = await fetch('https://back-margarita.vercel.app/v1/margarita/loginadmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '❌ Error en el login, intenta de nuevo ❌');
            }

            if (data.status === "Bienvenido") {
                setMensaje(data.status);
                callback(data.userId); // Llamar a la función callback con el userId
                setTimeout(() => {
                    navigate('/ganadores'); // Redirigir a la ruta de ganadores
                }, 2000);
            }
        } catch (error) {
            console.error("Error:", error);
            setMensaje(error.message);
        }
    };

    const handleRegister = () => {
        navigate('/newadmin');
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login de Administrador</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu nombre de usuario"
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
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>
                <button className="login-button" type="submit">Ingresar</button>
                <button className="register-button" type="button" onClick={handleRegister}>Añadir Nuevo Admin</button>
                {mensaje && (
                    <p className={mensaje.includes('Bienvenido') ? 'mensaje-exito' : 'mensaje-error'}>
                        {mensaje}
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginAdmin;
