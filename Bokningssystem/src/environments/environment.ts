import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


export const environment = {
    production: false,
    firebase: {
        projectId: 'edaf90-projekt-3bc60',
        appId: '1:505574107540:web:cc15a3e171b5409334c781',
        storageBucket: 'edaf90-projekt-3bc60.appspot.com',
        apiKey: 'AIzaSyBDiqZEDeXBniCEn2ZTYw4SMyby348VxQo',
        authDomain: 'edaf90-projekt-3bc60.firebaseapp.com',
        messagingSenderId: '505574107540',
    }
};

/* const app = initializeApp(environment.firebase);


export const db = getFirestore(app); */


