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

async function getDocterByState(state) {
    const doctorCollectionRef = collection(db, 'doctorCollection');
    const doctorSnapshot = await getDocs(doctorCollectionRef);
    const doctorDetailsByState = doctorSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (state === data.addreess.state) {
            return data;
        }
    });
    return doctorDetailsByState;
}

async function getDocterByCity(city) {
    const doctorCollectionRef = collection(db, 'doctorCollection');
    const doctorSnapshot = await getDocs(doctorCollectionRef);
    const doctorDetailsByCity = doctorSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (city === data.addreess.city) {
            return data;
        }
    });
    return doctorDetailsByCity;
}

async function getDocterByPincode(pincode) {
    const doctorCollectionRef = collection(db, 'doctorCollection');
    const doctorSnapshot = await getDocs(doctorCollectionRef);
    const doctorDetailsByPincode = doctorSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (pincode === data.addreess.pincode) {
            return data;
        }
    });
    return doctorDetailsByPincode;
}

async function getDocterByQualification(qualification) {
    const doctorCollectionRef = collection(db, 'doctorCollection');
    const doctorSnapshot = await getDocs(doctorCollectionRef);
    const doctorDetailsByQualification = doctorSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (qualification === data.qualification) {
            return data;
        }
    });
    return doctorDetailsByQualification;
}

// function for fetching doctor details 
async function getDoctorDetails(criteria, value) {
    const doctorCollectionRef = collection(db, 'doctorCollection');
    const doctorSnapshot = await getDocs(doctorCollectionRef);
    const doctorDetail = doctorSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });
    return doctorDetail;
}

async function getAllPatientByState(state) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailByState = patientSnapshot.docs.map((doc) => {
        if (doc.addreess.state === state) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailByState;
}

async function getAllPatientByCity(city) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailByCity = patientSnapshot.docs.map((doc) => {
        if (doc.addreess.city === city) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailByCity;
}

async function getAllPatientByPincode(pincod) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailByPincode = patientSnapshot.docs.map((doc) => {
        if (doc.addreess.pincod === pincod) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailByPincode;
}

async function getAllPatientOfHypertension(hypertension) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailOfHypertension = patientSnapshot.docs.map((doc) => {
        if (doc.hypertension === hypertension) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailOfHypertension;
}

async function getAllPatientByGender(gender) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailByGender = patientSnapshot.docs.map((doc) => {
        if (doc.gender === gender) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailByGender;
}

async function getAllPatientOfDybitic(dybitic) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailOfDybitic = patientSnapshot.docs.map((doc) => {
        if (doc.dybitic === dybitic) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailOfDybitic;
}

async function getAllPatientByBloodGroup(bloodGroup) {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailByBloodGroup = patientSnapshot.docs.map((doc) => {
        if (doc.bloodGroup === bloodGroup) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailByBloodGroup;
}

async function getAllPatientOfDybiticAndHypertension() {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailOfDybiticAndHypertension = patientSnapshot.docs.map((doc) => {
        if (doc.dybitic === true && doc.hypertension === true) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailOfDybiticAndHypertension;
}

async function getAllPatientOfNonDybiticAndHypertension() {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailOfNonDybiticAndHypertension = patientSnapshot.docs.map((doc) => {
        if (doc.dybitic === false && doc.hypertension === false) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailOfNonDybiticAndHypertension;
}

async function getAllPatientHavingAllergies() {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailHavingAllergies = patientSnapshot.docs.map((doc) => {
        if (doc.allergies.length > 0) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailHavingAllergies;
}

async function getAllPatientHavingNoAllergies() {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetailHavingNoAllergies = patientSnapshot.docs.map((doc) => {
        if (doc.allergies.length === 0) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return patientDetailHavingNoAllergies;
}

async function getAllAdultPatient() {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const adultPatientDetail = patientSnapshot.docs.map((doc) => {
        const age = calculateAge(doc.dateOfBirth);
        if (age >= 18) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return adultPatientDetail;
}

async function getAllChildrenPatient() {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const childrenPatientDetail = patientSnapshot.docs.map((doc) => {
        const age = calculateAge(doc.dateOfBirth);
        if (age < 18) {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }
    });
    return childrenPatientDetail;
}

// function for fetching patient details 
async function getPatientDetails() {
    const patientCollectionRef = collection(db, 'patientCollection');
    const patientSnapshot = await getDocs(patientCollectionRef);
    const patientDetail = patientSnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });
    return patientDetail;
}

export { getAllPendingDoctor, getDoctorDetails, getPatientDetails, getDocterByState, getDocterByCity, getDocterByPincode, getAllPatientByState, getDocterByQualification, getAllPatientByCity, getAllPatientByPincode, getAllPatientOfHypertension, getAllPatientByGender, getAllPatientOfDybitic, getAllPatientByBloodGroup, getAllPatientOfDybiticAndHypertension, getAllPatientOfNonDybiticAndHypertension, getAllPatientHavingAllergies, getAllPatientHavingNoAllergies, getAllAdultPatient, getAllChildrenPatient };