import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import "../../css/Login.css"
import { Footer } from "../../Utils/Footer"
import { AuthContext, AuthProvider } from "../../auth/AuthContext";

export default function DoctorLogin() {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState(
        {
            email: "",
            password: "",
        }
        )
        function handleChange(event) {
            const { name, value } = event.target
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value
                }
            })
        }
        const { login } = useContext(AuthContext);  
        function handleSubmit(event) {
        event.preventDefault();
        login(formData.email,formData.password,"doctor")
    }
    return (
        <div className="doctor-login main--container">
            <div className="login__container">
                <div className="login__card">

                    <h1 className="login__form__header --header">Welcome Back</h1>

                    <form className="login__form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                            className="login__input"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                            className="login__input"
                            required
                        />
                        <button type="submit" className="login__btn">Submit</button>
                    </form>

                    <span className="doctor__registration" onClick={() => navigate("/Doctor-Registration")}>Click here for Registration</span>
                </div>

                <div className="login__svg login--illustrator--doctor"></div>
                <Footer />
            </div>
        </div>
    )
}