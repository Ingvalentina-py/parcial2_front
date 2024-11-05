import React, { useState } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Forms from './components/Forms'; 
import Registro from './components/Registro'; 
import Ganadores from './components/Ganadores'; 
import LoginAdmin from './components/LoginAdmin';
import NewAdmin from './components/NewAdmin';
import ReclamarCodigo from './components/ReclamarCodigo'; 

function App() {
    const [userId, setUserId] = useState(null);

    const handleLogin = (userId) => {
        console.log("Usuario logueado con ID:", userId); // Esto debería mostrar el ID
        setUserId(userId);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Forms callback={handleLogin} />} />
                <Route path='/registro' element={<Registro />} />
                <Route path='/admin' element={<LoginAdmin callback={handleLogin} />} />
                <Route path='/ganadores' element={userId ? <Ganadores /> : <Navigate to="/admin" replace />} />
                <Route path='/newadmin' element={<NewAdmin />} />
                <Route 
          path='/reclamar-codigo' 
          element={userId ? <ReclamarCodigo userId={userId} /> : <Navigate to="/" replace />} 
        />
        
                {/* Otras rutas según sea necesario */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
