import {BrowserRouter , Routes , Route} from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddLocataire from "./pages/AddLocataire";
import AllLocataire from "./pages/AllLocataire"
import AddFacture from "./pages/AddFacture";
import { useNavigate } from "react-router-dom";
function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route index element={<Login/>} />
            <Route path='/Index' element={<Index/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/AddLocataire" element={<AddLocataire/>} />
            <Route path="/AllLocataire" element={<AllLocataire/>} />
            <Route path="/AddFacture" element={<AddFacture/>} />
            

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
