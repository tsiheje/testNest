import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Routescomponent from './Routes/routes';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          {Routescomponent.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={<route.element />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
