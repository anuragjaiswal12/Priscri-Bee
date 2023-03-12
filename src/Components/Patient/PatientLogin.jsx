import React from "react"
import { useNavigate } from "react-router-dom"
import { Footer } from "../../Utils/Footer"
import "../../css/Login.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../auth/firebaseAuth';
import 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

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

    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, formData.email, formData.password).then(
            async (res) => {
                console.log(`Login success.Welcome ${res.user.displayName}`);
                const patientCollectionRef = collection(db, 'patientCollection');
                const snapshot = await getDocs(patientCollectionRef);
                let isPatient = false;
                snapshot.docs.map((doc) => {
                    if (doc.get('email') == res.user.email) {
                        isPatient = true;
                    }
                });
                if (!isPatient) {
                    console.log('No user found');
                    await auth.signOut();
                }
                else {
                    console.log('Patient found');
                }
                // console.log(`Login success.Welcome ${res.user.displayName}`)
            }
        ).catch((err) => {
            if (err.message === 'Firebase: Error (auth/user-not-found).') {
                console.log('please create account first');
            }
            else if (err.message === 'Firebase: Error (auth/wrong-password).') {
                console.log('wrong password');
            }
        });
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