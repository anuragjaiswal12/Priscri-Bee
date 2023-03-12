import React from "react"
import { useNavigate } from "react-router-dom"
import { Footer } from "../../Utils/Footer"
import "../../css/Login.css"
import { AuthContext} from "../../auth/AuthContext";
import { useContext } from "react";
import 'firebase/firestore';

export default function PatientLogin() {
    const { login } = useContext(AuthContext)
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

    function handleSubmit(event) {
        event.preventDefault();
        login(formData.email,formData.password,"patient")
    }

    return (
        <div className="patient-login main--container">
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
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                            value={formData.firstName}
                            className="login__input"
                        />
                        <button type="submit" className="login__btn">Submit</button>
                    </form>

                    <span className="patient__registration" onClick={() => navigate("/Patient-Registration")}>Click here for Registration</span>
                </div>

                <div className="login__svg login--illustrator--patient" ></div>
                <Footer />
            </div>
        </div>
    )
}