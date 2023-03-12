import React from "react"
import { useNavigate } from "react-router-dom"
import "../../css/Login.css"
import { Footer } from "../../Utils/Footer"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../auth/firebaseAuth';
import 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

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
    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, formData.email, formData.password).then(
            async (res) => {
                console.log(`Login success.Welcome ${res.user.displayName}`);
                const pendingDoctorCollectionRef = collection(db, 'pendingDoctorCollection');
                const snapshot = await getDocs(pendingDoctorCollectionRef);
                let isPendingDoctor = false;
                snapshot.docs.map((doc) => {
                    if (doc.get('email') == res.user.email) {
                        isPendingDoctor = true;
                    }
                });
                if (!isPendingDoctor) {
                    const doctorCollectionRef = collection(db, 'confirmDoctorCollection');
                    const confirmDoctorSnapshot = await getDocs(doctorCollectionRef);
                    let isConfirmDoctor = false;
                    snapshot.docs.map((doc) => {
                        if (doc.get('email') == res.user.email) {
                            isConfirmDoctor = true;
                        }
                    });
                    if (!isConfirmDoctor) {
                        console.log('No user found');
                        await auth.signOut();
                    }
                    else {
                        console.log('confirm doctor');
                    }
                }
                else {
                    console.log('pending doctor');
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