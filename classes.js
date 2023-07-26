import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"

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
const database = ref(getDatabase());

function removeAllChildNodes(parent) {
    while (parent.childElementCount > 1) {
        parent.removeChild(parent.lastChild);
    }
}

function removeAllChildNodesTrue(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get('name')
console.log(name)

const sem1 = document.getElementById("sem1")
const sem2 = document.getElementById("sem2")

const people = document.getElementById("people")
const teachercon = document.getElementById("teacher")
const course = document.getElementById("course")

const peopleContent = document.getElementById("peopleContent")
const teacherContent = document.getElementById("teacherContent")
const courseContent = document.getElementById("courseContent")

const peopleClass = document.getElementById("peopleclass")
const peopleTeacher = document.getElementById("peopleteacher")
const peopleCourse = document.getElementById("peoplecourse")


get(child(database, `data/${name}/${"Semester One"}`)).then((snapshot) => {
    if (snapshot.exists()) {
      let inf = (snapshot.val());
      for (let i in inf){
        let p = document.createElement("p")
        p.textContent = i + "\t" + inf[i]["class"] + ` (${inf[i]["teacher"]})`
        sem1.appendChild(p)
        p.id = i + ` ${inf[i]["teacher"]}`
        p.dataset.class = inf[i]["class"]
        p.addEventListener("click", function(){
            console.log(p.dataset.class)
            peopleClass.textContent = "People in your " + inf[i]["class"] + " period " + i
            peopleTeacher.textContent =  "People taking this course with " + inf[i]["teacher"]
            peopleCourse.textContent =  "Everyone in course " + inf[i]["class"]

            removeAllChildNodes(peopleContent)
            removeAllChildNodes(teacherContent)
            removeAllChildNodes(courseContent)

            
            get(child(database, "data")).then((snapshot) => {
                if (snapshot.exists()){
                    let inf2 = snapshot.val()
                    console.log(inf2)
                    console.log(p.id)
                    let elements = p.id.split(" ")
                    let period = elements[0]
                    let teacher  = elements[1] + " " + elements[2]
                    console.log(period, teacher)
                    for (let key in inf2){
                        console.log(period)
                        console.log(inf2[key]["Semester One"])
                        if (inf2[key]["Semester One"][period] == undefined){
                        }
                        else if (inf2[key]["Semester One"][period]["teacher"] == teacher){
                            let p1 = document.createElement("p1")
                            p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                            p1.textContent = key
                            peopleContent.appendChild(p1)
                        }
                        for (let inner in inf2[key]["Semester One"]){
                            if (inf2[key]["Semester One"][inner] == undefined){
                                continue;
                            }

                            if (inf2[key]["Semester One"][inner]["teacher"] == teacher){
                                let p1 = document.createElement("p1")
                                p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                                p1.textContent = key
                                teacherContent.appendChild(p1)
                            }
                        }
                        for (let inner in inf2[key]["Semester One"]){
                            if (inf2[key]["Semester One"][inner] == undefined){
                                continue;
                            }
                            if (inf2[key]["Semester One"][inner]["class"] == p.dataset.class){
                                let p1 = document.createElement("p1")
                                p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                                p1.textContent = key
                                courseContent.appendChild(p1)
                            }
                        }
                        
                    }
                }
            })
        })
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  get(child(database, `data/${name}/${"Semester Two"}`)).then((snapshot) => {
    if (snapshot.exists()) {
      let inf = (snapshot.val());
      for (let i in inf){
        let p = document.createElement("p")
        p.textContent = i + "\t" + inf[i]["class"] + ` (${inf[i]["teacher"]})`
        sem2.appendChild(p)
        p.id = i + ` ${inf[i]["teacher"]}`
        console.log(inf[i])
        p.dataset.class = inf[i]["class"]
        p.addEventListener("click", function(){
            console.log(p.dataset.class)
            peopleClass.textContent = "People in your " + inf[i]["class"]+ " period " + i
            peopleTeacher.textContent =  "People taking this course with " + inf[i]["teacher"]
            peopleCourse.textContent =  "Everyone in course " + inf[i]["class"]
            removeAllChildNodes(peopleContent)
            removeAllChildNodes(teacherContent)
            removeAllChildNodes(courseContent)
            get(child(database, "data")).then((snapshot) => {
                if (snapshot.exists()){
                    let inf2 = snapshot.val()
                    console.log(inf2)
                    console.log(p.id)
                    let elements = p.id.split(" ")
                    let period = elements[0]
                    let teacher  = elements[1] + " " + elements[2]
                    console.log(period, teacher)
                    for (let key in inf2){
                        if (inf2[key]["Semester One"][period] == undefined){
                        }
                        else if (inf2[key]["Semester One"][period]["teacher"] == teacher){
                            let p1 = document.createElement("p1")
                            p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                            p1.textContent = key
                            peopleContent.appendChild(p1)
                        }
                        for (let inner in inf2[key]["Semester Two"]){
                            if (inf2[key]["Semester One"][inner] == undefined){
                                continue;
                            }
                            if (inf2[key]["Semester One"][inner]["teacher"] == teacher){
                                let p1 = document.createElement("p1")
                                p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                                p1.textContent = key
                                teacherContent.appendChild(p1)
                            }
                        }
                        for (let inner in inf2[key]["Semester Two"]){
                            if (inf2[key]["Semester One"][inner] == undefined){
                                continue;
                            }
                            if (inf2[key]["Semester One"][inner]["class"] == p.dataset.class){
                                let p1 = document.createElement("p1")
                                p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                                p1.textContent = key
                                courseContent.appendChild(p1)
                            }
                        }
                    }
                    
                }
            })
        })
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });


let data
get(child(database, "data")).then((snapshot) => {
    if (snapshot.exists()){
        data = snapshot.val();
    }
})
const search = document.getElementById("search")
const searchResults = document.getElementById("searchResults")
search.addEventListener("input", function(){
    removeAllChildNodesTrue(searchResults)
    let currSearch = search.value
    //console.log(search.value)
    let matches = 0
    for (let key in data){
        if (key.slice(0, currSearch.length).toLowerCase() == currSearch.toLowerCase()){
            if (matches >= 3){
                return
            }
            console.log(key)
            let div = document.createElement("div")
            let p = document.createElement("p")
            p.textContent = key
            p.setAttribute("style", "padding-left: 10px")
            div.appendChild(p)
            div.classList.add("result")
            div.addEventListener("click", function(){
                window.location.href = `classes.html?name=${key}` 
            })
            searchResults.appendChild(div)
            matches++
        }
    }
})