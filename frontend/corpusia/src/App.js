// import './App.css';
// import { Canvas } from './Canvas';

// function App() {
//   return (
//     <div className='App'>
//       <Canvas />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import Viewer from './pages/viewer.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return <Router>
    <Routes>
      <Route exact path="/">
        <Viewer />
      </Route>
    </Routes>
  </Router>
}

export default App;
