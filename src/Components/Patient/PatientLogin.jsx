import React from "react"
import { useNavigate } from "react-router-dom"
import { Footer } from "../../Utils/Footer"
import "../../css/Login.css"

export default function PatientLogin() {
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
    return (
        <div className="patient-login main--container">
            <div className="login__container">
                <div className="login__card">

                    <h1 className="login__form__header --header">Welcome Back</h1>

                    <form className="login__form">
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

                <span className="patient__registration" onClick={()=> navigate("/Patient-Registration")}>Click here for Registration</span>
                </div>

                <div className="login__svg login--illustrator--patient" ></div>
                <Footer/>
            </div>
        </div>
    )
}