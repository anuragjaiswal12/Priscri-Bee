import React, { useState } from "react";
import { auth, db } from '../auth/firebaseAuth';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password, portel) => {
    // Your login logic goes here
    // Set the user state if login is successful
    signInWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        console.log(`Login success.Welcome ${res.user.displayName}`);
        let user = "";

        if (portel === "doctor") {
          console.log("Doctor Called")
          const pendingDoctorCollectionRef = collection(db, 'pendingDoctorCollection');
          const DoctorSnapshot = await getDocs(pendingDoctorCollectionRef);
          DoctorSnapshot.docs.map((doc) => {
            if (doc.get('email') == res.user.email) {
              user = "Doctor";
            }
          });
          if (!isPendingDoctor) {
            const doctorCollectionRef = collection(db, 'confirmDoctorCollection');
            const confirmDoctorSnapshot = await getDocs(doctorCollectionRef);
            DoctorSnapshot.docs.map((doc) => {
              if (doc.get('email') == res.user.email) {
                user = "Doctor";
                setUser({ user })
              }
            });
            if (!user) {
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
        }
        if (portel === "user") {
          const patientCollectionRef = collection(db, 'patientCollection');
          const patientSnapshot = await getDocs(patientCollectionRef);
          let isPatient = false;
          snapshot.docs.map((doc) => {
            if (doc.get('email') == res.user.email) {
              user = "patient";
              setUser({ user })
            }
          });
        }
      }
    ).catch((err) => {
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
