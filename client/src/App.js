import HomePage from './components/Homepage';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";




function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
      <Route  path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-page" element={<UserPage />} />
      </Routes>
       </BrowserRouter>
      
   

    </div>
  );
}

export default App;


