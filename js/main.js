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
            <button id="btn${myCourses.courses[i].id}" class="cardBtn" onclick="loadCourseInfo(${myCourses.courses[i].id}), displayPlayers(${i});">SELECT</button>
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
  selectedCourse = myScoreCards.collection[course]
  $("#scoreTable").html("");
  for(let i = 0; i < selectedCourse.collection.length; i++) {
    $("#scoreTable").append(
      `<div class="player" class="playerInfo">
        <div class="playerScores" id="playerScores${myScoreCards.collection[course].courseId}-${selectedCourse.collection[i].id}">
          <input id="playerName" type="text" placeholder="Player Name">
        </div>
        <div class="playerTotals" id="playerTotals${myScoreCards.collection[course].courseId}-${selectedCourse.collection[i].id}"></div>
      </div>`
    );
    for(let j = 0; j < selectedCourse.holes; j++) {
      $(`#playerScores${myScoreCards.collection[course].courseId}-${selectedCourse.collection[i].id}`).append(
        `<input id="p${selectedCourse.collection[i].id}h${j}" class="scoreInput" type="text" placeholder="${j}">`
      );
    }
    updateTotals(course, i);
  }
}

//work in progress below
function updateTotals(course, player) {
  let total = 0;
  //this needs to be re-written on a model level player.addscore
  for(let i = 0; i < 18; i++) {
    console.log(`#p${myScoreCards.collection[course].collection[player].id}h${i}`)
    parseInt($(`#p${myScoreCards.collection[course].collection[player].id}h${i}`).val()) + total;
    console.log(total)
  }
  $(`#playerTotals${myScoreCards.collection[course].courseId}-${selectedCourse.collection[player].id}`).append(
    `<div>Total: ${total}</div>`
  );
}

$(".scoreInput").keypress(function(e) {
  if (e.which == 13) {
    console.log("hi")
    displayPlayers();
  }
})