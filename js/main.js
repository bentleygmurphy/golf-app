let myCourses = {};
let currentCourse = {};

(function() {
  loadCourses();
})();

function loadCourses() {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myCourses = JSON.parse(this.responseText);
      addCourses();
      for (let i = 0; i < myCourses.courses.length; i++) {
        $("#courseCardTray").append(
          `<div class="card">
            <div class="cardImg" style="background-image: url(${myCourses.courses[i].image})"></div>
            <span>${myCourses.courses[i].name}</span>
            <button id="btn${myCourses.courses[i].id}" class="cardBtn" onclick="loadCourseInfo(${myCourses.courses[i].id})">SELECT</button>
          </div>`
        );
      }
    }
  };
  xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
  xhttp.send();
}

function addCourses(id) {
  for(let i = 0; i < myCourses.courses.length; i++) {
    myScoreCards.add(myCourses.courses[i].id);
   }
}

function loadCourseInfo(id) {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      currentCourse = JSON.parse(this.responseText);
      $(`#btn${id}`).css("background-color", "rgba(33, 118, 255, 1)");
      $("#scoreCard").css("display", "flex");
      $("#selectTee").html("");
      for (let i = 0; i < currentCourse.data.holes[0].teeBoxes.length; i++) {
        $("#selectTee").append(
          `<option value="${i}">${currentCourse.data.holes[0].teeBoxes[i].teeType}</option>`
        );
      }
    }
  };
  xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${id}`, true);
  xhttp.send();
}

let playerIdCounter = 0;

$("#addPlayer").click(function() {
  for(let i = 0; i < myScoreCards.collection.length; i++) {
    if(myScoreCards.collection[i].courseId == currentCourse.data.id) {
      myScoreCards.collection[i].add(playerIdCounter);
      playerIdCounter ++;
      displayPlayers(i);
    }
  }
})

function displayPlayers(course) {
  course = myScoreCards.collection[course]
  for(let i = 0; i < course.collection.length; i++) {
    console.log(i);
  }
}
