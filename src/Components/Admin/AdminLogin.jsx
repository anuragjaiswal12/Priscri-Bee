import React from "react"
import { useNavigate } from "react-router-dom"
import "../../css/Login.css"
import { Footer } from "../../Utils/Footer"

export default function AdminLogin() {
    const navigate = useNavigate() 
    const [formData, setFormData] = React.useState(
        {
            email: "",
            password: "",
        }
    )
    function handleChange(event) {
        const { name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        login(formData.email,formData.password,"admin")
    }
    return (
        <div className="doctor-login main--container">
            <div className="login__container width--auto" >
                <div className="login__card">
                    <h1 className="login__form__header --header">Welcome Back Admin :)</h1>
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

                </div>
                <Footer/>
            </div>
        </div>
    )
}