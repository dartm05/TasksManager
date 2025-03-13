import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
dotenv.config();

export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "task-manager-48639.firebaseapp.com",
    projectId: "task-manager-48639",
    storageBucket: "task-manager-48639.firebasestorage.app",
    messagingSenderId: "69026217505",
    appId: "1:69026217505:web:8376bc771b1dfc1c6c2d60",
    measurementId: "G-KHR97ZJPE9"
};

initializeApp(firebaseConfig);
export const db = getFirestore();
