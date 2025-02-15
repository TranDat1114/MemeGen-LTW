import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCy25AlHFFD9qmPGXasETmqun9Dd_SIv7A",
    authDomain: "meme-gen-f7d2b.firebaseapp.com",
    projectId: "meme-gen-f7d2b",
    storageBucket: "meme-gen-f7d2b.firebasestorage.app",
    messagingSenderId: "521428739913",
    appId: "1:521428739913:web:f5f2db99f422bd82851c98",
    measurementId: "G-7CLTHN81N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const SignUpWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        return result 
    } catch (error) {
        console.log(error);
        
    }
}