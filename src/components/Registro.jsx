import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para la navegación
import './styles/Registro.css'; // Importa el archivo CSS para estilos

function Registro() {
  // Definición de los estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  // Manejo del registro
  const handleRegister = async (event) => {
    event.preventDefault(); // Evitar que el formulario se recargue

    const datos = {
      nombre,
      fecha,
      cedula,
      correo,
      celular,
      ciudad,
      contraseña,
    };

    try {
      // Validación adicional de correo
      if (!/\S+@\S+\.\S+/.test(correo)) {
        throw new Error("Correo no es válido");
      }

      const response = await fetch('https://back-margarita.vercel.app/v1/margarita/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); 
      }

      const data = await response.json();
      setMensaje("🎉 ¡Registro exitoso! 🎉");
      setTipoMensaje('exito');
      // Limpiar el formulario tras el registro exitoso
      setNombre('');
      setFecha('');
      setCedula('');
      setCorreo('');
      setCelular('');
      setCiudad('');
      setContraseña('');

    } catch (error) {
      console.error("Error:", error);
      setMensaje(error.message || "❌ Error en el registro, intenta de nuevo ❌");
      setTipoMensaje('error');
    }
  };

  return (
    <div className="registro-container">
      <h2 className="registro-title">🤑🤑 REGÍSTRATE Y GANA 🤑🤑</h2>
      <form onSubmit={handleRegister} className="registro-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            placeholder="Ingresa tu cédula"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="celular">Celular</label>
          <input
            type="text"
            id="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder="Ingresa tu número de celular"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Ingresa tu ciudad"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button className="register-button" type="submit">Registrar</button>
        {mensaje && <p className={tipoMensaje === 'exito' ? 'mensaje-exito' : 'mensaje-error'}>{mensaje}</p>}
        <Link to="/" className="back-button">Regresar</Link>
      </form>
    </div>
  );
}

export default Registro;
