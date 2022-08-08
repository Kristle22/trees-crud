import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './bootstrap.css';
import Back from './pages/Back';
import Front from './pages/Front';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Front />} />
        <Route path='/admin' element={<Back />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
