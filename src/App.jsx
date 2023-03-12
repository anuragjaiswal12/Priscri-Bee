import LoginNavigator from "./Components/LoginNavigator"
import {Routes,Route} from 'react-router-dom'  
import AdminLogin from "./Components/Admin/AdminLogin"
import AdminDashbord from "./Components/Admin/AdminDashboard"
import DoctorLogin from "./Components/Doctor/DoctorLogin"
import DoctorRegistration from "./Components/Doctor/DoctorRegistration"
import DoctorDashboard from "./Components/Doctor/DoctorDashboard"
import PatientLogin from "./Components/Patient/PatientLogin"
import PatientRegistration from "./Components/Patient/PatientRegistration"
import PatientDashboard from "./Components/Patient/PatientDashboard"

function App(){
  return(
      <Routes>
        <Route path="/" element={<LoginNavigator/>}/>
        <Route path="/Admin-Login" element={<AdminLogin/>}/>
        <Route path="/Admin-Dashboard" element={<AdminDashbord/>}/>
        <Route path="/Doctor-Login" element={<DoctorLogin/>}/>
        <Route path="/Doctor-Registration" element={<DoctorRegistration/>}/>
        <Route path="/Doctor-Dashboard" element={<DoctorDashboard/>}/>
        <Route path="/Patient-Login" element={<PatientLogin/>}/>
        <Route path="/Patient-Registration" element={<PatientRegistration/>}/>
        <Route path="/Patient-Dashboard" element={<PatientDashboard/>}/>
      </Routes>
  )
}
export default App
