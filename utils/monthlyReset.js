import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export async function resetMonthlyRent() {
  const now = new Date();
  if (now.getDate() !== 1) return; // Only run on 1st day of month

  const tenants = await getDocs(collection(db, "tenants"));

  tenants.forEach(async (d) => {
    await updateDoc(doc(db, "tenants", d.id), { paid: false });
  });

  console.log("✅ Monthly Rent Reset Completed");
}
