import { AuthContext } from "../../auth/AuthContext"
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function DoctorDashboard(){
    const { user, logout ,login } = useContext(AuthContext);
    return(
    <>
        {
            user !== "Doctor" ? <Navigate to="/Doctor-Login" /> : <div className="main-container">This is doctor's dashboard</div>
        } 
    </>
    )
}