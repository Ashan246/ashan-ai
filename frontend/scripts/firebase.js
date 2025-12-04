apiKey: "ඔයාගේ_API_KEY",
authDomain: "ඔයාගේ_PROJECT.firebaseapp.com",
projectId: "ඔයාගේ_PROJECT_ID",
storageBucket: "ඔයාගේ_PROJECT.appspot.com",
messagingSenderId: "ඔයාගේ_MESSAGING_SENDER_ID",
appId: "ඔයාගේ_APP_ID"
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
const db = getFirestore();

async function canUseFeature(userId, feature) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            name: "",
            email: "",
            isPaid: false,
            dailyUsage: { chat: 0, image: 0, video: 0, music: 0, app: 0 },
            lastUpdate: today
        });
        return true;
    }

    const data = userSnap.data();

    // Reset count if day changed
    if (data.lastUpdate !== today) {
        await updateDoc(userRef, {
            dailyUsage: { chat: 0, image: 0, video: 0, music: 0, app: 0 },
            lastUpdate: today
        });
        data.dailyUsage = { chat: 0, image: 0, video: 0, music: 0, app: 0 };
    }

    if (data.isPaid) return true; // Paid user → unlimited
    if ((data.dailyUsage[feature] || 0) < 3) return true; // Free limit 3
    return false;
}

async function incrementUsage(userId, feature) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();

    data.dailyUsage[feature] = (data.dailyUsage[feature] || 0) + 1;
    await updateDoc(userRef, { dailyUsage: data.dailyUsage });
}
