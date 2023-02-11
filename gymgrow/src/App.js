import "./index.css"
import {
  BrowserRouter,
  Routes,Route
} from "react-router-dom"
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
