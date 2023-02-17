import "./index.css"
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom"
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Ownerhome from "./Components/Ownerhome"
import Logout from "./Components/Logout"
import AddMember from "./Components/AddMember";
import MemberDetails from "./Components/MemberDetails";
import OneMemberData from "./Components/OneMemberData";
import AddGymDetails from "./Components/AddGymDetails";
import MemberSignin from "./Components/MemberSignin";
import MemberHome from "./Components/MemberHome";
import GymDetails from "./Components/GymDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />
          <Route path="/ownerhome" element={<Ownerhome />} />
          <Route path="/addmember" element={<AddMember />} />
          <Route path="/memberdetails" element={<MemberDetails />} />
          <Route path={"/onememberdata/:id"} element={<OneMemberData />} />
          <Route path="/addgymdetails" element={<AddGymDetails />} />
          <Route path="/gymdetails" element={<GymDetails/>}/>
          <Route path="/memberlogin" element={<MemberSignin/>}/>
          <Route path="/memberhome" element={<MemberHome/>}/>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
