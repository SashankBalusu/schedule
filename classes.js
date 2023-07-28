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

const isUserUsingMobile = () => {

    // User agent string method
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Screen resolution method
    if (!isMobile) {
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        isMobile = (screenWidth < 768 || screenHeight < 768);
    }
    
    // Touch events method
    if (!isMobile) {
        isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }
    
    // CSS media queries method
    if (!isMobile) {
        let bodyElement = document.getElementsByTagName('body')[0];
        isMobile = window.getComputedStyle(bodyElement).getPropertyValue('content').indexOf('mobile') !== -1;
    }
    
    return isMobile
    }
if (isUserUsingMobile()) {
    alert ("USE A COMPUTER FOR THIS SITE TRUST")
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
                        if (inf2[key]["Semester Two"][period] == undefined){
                        }
                        else if (inf2[key]["Semester Two"][period]["teacher"] == teacher){
                            let p1 = document.createElement("p1")
                            p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                            p1.textContent = key
                            peopleContent.appendChild(p1)
                        }
                        for (let inner in inf2[key]["Semester Two"]){
                            if (inf2[key]["Semester Two"][inner] == undefined){
                                continue;
                            }
                            if (inf2[key]["Semester Two"][inner]["teacher"] == teacher){
                                let p1 = document.createElement("p1")
                                p1.setAttribute("style", "display:block; font-size: 16px; margin-top: 20px")
                                p1.textContent = key
                                teacherContent.appendChild(p1)
                            }
                        }
                        for (let inner in inf2[key]["Semester Two"]){
                            if (inf2[key]["Semester Two"][inner] == undefined){
                                continue;
                            }
                            if (inf2[key]["Semester Two"][inner]["class"] == p.dataset.class){
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
    if (currSearch.trim() == ""){
        let p = document.createElement("p")
        p.textContent = "Click on a course to view roster info!"
        searchResults.appendChild(p)
        return
    }
    //console.log(search.value)
    let matches = 0
    for (let key in data){
        if (key.slice(0, currSearch.length).toLowerCase() == currSearch.toLowerCase()){
            if (matches >= 12){
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
    if (matches == 0){
        let p = document.createElement("p")
        p.textContent = "No results found!"
        p.setAttribute("style", "padding-left: 10px")

        searchResults.appendChild(p)
        return
    }
})
const findCompare = document.getElementById("findCompare")
const compareSearchResults = document.getElementById("compareSearchResults")
const compareContent = document.getElementById("compareContent")
findCompare.addEventListener("input", function(){
    removeAllChildNodesTrue(compareSearchResults)
    let currSearch = findCompare.value
    //console.log(search.value)
    let matches = 0
    for (let key in data){
        if (key.slice(0, currSearch.length).toLowerCase() == currSearch.toLowerCase()){
            if (matches >= 5){
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
                removeAllChildNodesTrue(compareSearchResults)
                removeAllChildNodesTrue(compareContent)


                let h2 = document.createElement("h2")
                h2.textContent = "Semester One"
                h2.classList.add("header")

                compareContent.appendChild(h2)
                for (let innerkey in data[name]["Semester One"]){
                    if (data[key]["Semester One"][innerkey] == undefined){
                        continue
                    }
                        if (data[name]["Semester One"][innerkey]["teacher"] == data[key]["Semester One"][innerkey]["teacher"]){
                            let p = document.createElement("p")
                            p.textContent = `Period: ${innerkey}, ${data[name]["Semester One"][innerkey]["class"]} (${data[name]["Semester One"][innerkey]["teacher"]})`
                            compareContent.appendChild(p)
                        }

                }
                let h22 = document.createElement("h2")
                h22.textContent = "Semester Two"
                h22.classList.add("header")
                compareContent.appendChild(h22)
                for (let innerkey in data[name]["Semester Two"]){
                    
                    if (data[key]["Semester Two"][innerkey] == undefined){
                        continue
                    }
                        if (data[name]["Semester Two"][innerkey]["teacher"] == data[key]["Semester Two"][innerkey]["teacher"]){
                            let p = document.createElement("p")
                            p.textContent = `Period: ${innerkey}, ${data[name]["Semester Two"][innerkey]["class"]} (${data[name]["Semester Two"][innerkey]["teacher"]})`
                            compareContent.appendChild(p)
                        }

                }
            })
            compareSearchResults.appendChild(div)
            matches++
        }
    }
    if (matches == 0){
        let p = document.createElement("p")
        p.textContent = "No results found!"
        p.setAttribute("style", "padding-left: 10px")
        compareSearchResults.appendChild(p)
        return
    }
})