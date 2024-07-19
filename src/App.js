
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './Components/form/Login';
import Home from './Components/form/Home';
import Authcontext from './Components/form/Authcontext';

function App() {
  
  return (
    <div className="App">
     
     
     
      <BrowserRouter>
        <Authcontext>
         <Routes>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/' element={<Login/>}/>
           
         </Routes>
         </Authcontext>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
