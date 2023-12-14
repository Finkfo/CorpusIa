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
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return <Router>
    <Switch>
      <Route exact path="/Viewer">
        <Viewer />
      </Route>
    </Switch>
  </Router>
}

export default App;
