import { db } from '../auth/firebaseAuth';
import { collection, getDocs } from 'firebase/firestore';
import { calculateAge } from './calculateAge';

// function for fetching pending doctor details. 
async function getAllPendingDoctor() {
    const pendingDoctorCollectionRef = collection(db, 'pendingDoctorCollection');
    const pendingDoctorSnapshot = await getDocs(pendingDoctorCollectionRef);
    const allPendingDoctor = pendingDoctorSnapshot.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data;
    });
    return allPendingDoctor;
}

// function for fetching doctor details for diffrent criteria or no criteria
async function getDoctorDetails(criteria, value) {
    const doctorCollectionRef = collection(db, 'doctorCollection');
    const doctorSnapshot = await getDocs(doctorCollectionRef);
    const doctorDetail = doctorSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (criteria === 'state') {
            if (data.addreess.state === value) {
                return data;
            }
        }
        else if (criteria === 'city') {
            if (data.addreess.city === value) {
                return data;
            }
        }
        else if (criteria === 'pincode') {
            if (data.addreess.pincod === value) {
                return data;
            }
        }
        else if (criteria === 'qualification') {
            if (data.qualification === value) {
                return data;
            }
        }
        else {
            return data;
        }
    });
    return doctorDetail;
}

// function for fetching patient details for diffrent criteria or no criteria
async function getPatientDetails(criteria, value) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetail = patientSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (criteria === 'state') {
            if (data.addreess.state === value) {
                return data;
            }
        }
        else if (criteria === 'city') {
            if (data.addreess.city === value) {
                return data;
            }
        }
        else if (criteria === 'pincode') {
            if (data.addreess.pincod === value) {
                return data;
            }
        }
        else if (criteria === 'hypertension') {
            if (data.hypertension === value) {
                return data;
            }
        }
        else if (criteria === 'gender') {
            if (data.gender === value) {
                return data;
            }
        }
        else if (criteria === 'dybitic') {
            if (data.isDybitic === value) {
                return data;
            }
        }
        else if (criteria === 'bloodGroup') {
            if (data.bloodGroup === value) {
                return data;
            }
        }
        else if (criteria === 'dybiticAndHypertension') {
            if (data.hypertension === true && data.isDybitic === true) {
                return data;
            }
        }
        else if (criteria === 'nonDybiticAndHypertension') {
            if (data.hypertension === false && data.isDybitic === false) {
                return data;
            }
        }
        else if (criteria === 'havingAllergies') {
            if (data.allergies.length > 0) {
                return data;
            }
        }
        else if (criteria === 'notHavingAllergies') {
            if (data.allergies.length === 0) {
                return data;
            }
        }
        else if (criteria === 'adultPatient') {
            const age = calculateAge(data.dateOfBirth);
            if (age >= 18) {
                return data;
            }
        }
        else if (criteria === 'childrenPatient') {
            const age = calculateAge(data.dateOfBirth);
            if (age < 18) {
                return data;
            }
        }
        else {
            return data;
        }
    });
    return patientDetail;
}

export { getAllPendingDoctor, getDoctorDetails, getPatientDetails };