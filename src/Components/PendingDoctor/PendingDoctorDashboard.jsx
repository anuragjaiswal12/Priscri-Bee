import { AuthContext } from "../../auth/AuthContext"
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function PendingDoctorDashboard(){
    const { user, logout ,login } = useContext(AuthContext);
    return(
    <>
        {
            user !== "PendingDoctor" ? <Navigate to="/Doctor-Login" /> : <div className="main-container">This is pending doctor's dashboard</div>
        } 
    </>
    )
}