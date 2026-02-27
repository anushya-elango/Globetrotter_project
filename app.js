import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add trip
window.addTrip = async function () {
  const name = document.getElementById("tripName").value;
  if (!name) return;

  await addDoc(collection(db, "trips"), {
    name: name,
    createdAt: new Date()
  });

  document.getElementById("tripName").value = "";
};

// Real-time listener
const list = document.getElementById("tripList");

onSnapshot(collection(db, "trips"), (snapshot) => {
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.data().name;
    list.appendChild(li);
  });
});
