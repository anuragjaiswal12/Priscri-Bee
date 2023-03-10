// Navigates uses to their respactive login module
import "../css/LoginNavigator.css"
import { useNavigate } from "react-router-dom"

function LoginNavigator() {
    const navigate = useNavigate()
    return (
        <div className="navigator main--container">
            <h1 className="navigator__header">Choose Your Portal</h1>
            <div className="navigator__container">
                <div 
                    className="login__navigator --doctor"
                    onClick={()=>navigate("/Doctor-Login")}>
                </div>

                <div className="login__navigator --patient"
                    onClick={()=>navigate("/Patient-Login")}>
                </div>
            </div>
        </div>
    )
}

export default LoginNavigator