import React, { useEffect, useState } from "react";
import { auth, db } from '../auth/firebaseAuth';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user === "Doctor") {
      navigate("/Doctor-Dashboard")
    } else if (user === "PendingDoctor") {
      navigate("/Doctor-Dashboard")
    }
    else if (user === "Patient") {
      navigate("/Patient-Dashboard")
    } else if (user === "Admin") {
      navigate("/Admin")
    }
    // Pending user

  }, [user]);

  const login = (email, password, portel) => {
    // Your login logic goes here
    // Set the user state if login is successful
    signInWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        console.log(portel)
        console.log(`Login success.Welcome ${res.user.displayName}`);

        if (portel === 'doctor') {
          const pendingDoctorCollectionRef = collection(db, 'pendingDoctorCollection');
          const pendingDoctorSnapshot = await getDocs(pendingDoctorCollectionRef);
          let isPendingDoctor = false;
          pendingDoctorSnapshot.docs.map((doc) => {
            if (doc.get('email') === res.user.email) {
              isPendingDoctor = true;
            }
          });
          if (isPendingDoctor) {
            setUser("PendingDoctor")
          }
          else {
            const confirmDoctorCollectionRef = collection(db, 'doctorCollection');
            const confirmDoctorSnapshot = await getDocs(confirmDoctorCollectionRef);
            let isConfirmDoctor = false;
            confirmDoctorSnapshot.docs.map((doc) => {
              if (doc.get('email') === res.user.email) {
                isConfirmDoctor = true;
              }
            });
            if (isConfirmDoctor) {
              setUser("Doctor")
            }
            else {
              console.log('No doctor found');
              await auth.signOut();
            }
          }
        }
        else if (portel === 'patient') {
          const patientCollectionRef = collection(db, 'patientCollection');
          const patientCollectionSnapshot = await getDocs(patientCollectionRef);
          let isPatient = false;
          patientCollectionSnapshot.docs.map((doc) => {
            if (doc.get('email') === res.user.email) {
              isPatient = true;
            }
          });
          if (isPatient) {
            console.log("Patient Found")
            setUser("Patient")
          }
          else {
            console.log('no patient found');
            await auth.signOut();
          }
        }
        else if (portel === 'admin') {
          const adminCollectionRef = collection(db, 'adminCollection');
          const adminCollectionSnapshot = await getDocs(adminCollectionRef);
          let isAdmin = false;
          adminCollectionSnapshot.docs.map((doc) => {
            if (doc.get('email') === res.user.email) {
              isAdmin = true;
            }
          });
          if (isAdmin) {
            setUser("Admin")
          }
          else {
            console.log('admin not found');
            await auth.signOut();
          }
        }
      }).catch((err) => {
        if (err.message === 'Firebase: Error (auth/user-not-found).') {
          console.log('please create account first');
        }
        else if (err.message === 'Firebase: Error (auth/wrong-password).') {
          console.log('wrong password');
        }
      });
  };

  const logout = () => {
    // Your logout logic goes here
    // Remove the user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
