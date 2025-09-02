import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './page/home';
import { Category } from './page/category';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
