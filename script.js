import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCuRgKKcyQpugodXDnt2BBC6jHWwXWS3JY",
authDomain: "schedule-c283b.firebaseapp.com",
databaseURL: "https://schedule-c283b-default-rtdb.firebaseio.com",
projectId: "schedule-c283b",
storageBucket: "schedule-c283b.appspot.com",
messagingSenderId: "642346032628",
appId: "1:642346032628:web:2995020a933fcb74a82da1",
measurementId: "G-BNVEK73K6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

const schedule = document.getElementById("schedule")
const name = document.getElementById("name")
const submit = document.getElementById("submit")
submit.addEventListener("click", function(){
    let student = name.value
    if (student == ""){
        alert("Enter a student name!")
        return
    }
    console.log(student)
    let sched = schedule.value.trim().split(("\n"))
    console.log(sched)
    let sem1ID = sched.indexOf("Semester 1")
    let sem2ID = sched.indexOf("Semester 2")
    if (sem1ID == -1 || sem2ID == -1){
        alert("Can't find both semester headers, try again!")
        return
    }
    console.log(sem1ID, sem2ID)

    for (let i = sem1ID + 2; i < sem2ID; i++){
        let schedSplit = sched[i].split("\t")
        console.log(schedSplit)
        set(ref(database, "data/" + student + "/Semester One/" + schedSplit[1] + "/"), {
            class : schedSplit[0],
            teacher: schedSplit[2]

        })
    }
    for (let i = sem2ID + 2; i < sched.length; i++){
        let schedSplit = sched[i].split("\t")
        console.log(schedSplit)
        set(ref(database, "data/" + student + "/Semester Two/" + schedSplit[1] + "/"), {
            class : schedSplit[0],
            teacher: schedSplit[2]

        })

    }
    
    setTimeout(() => {
        window.location.href = `classes.html?name=${student}`
      }, "1000");

})