let myCourses = {};

(function() {
  loadCourses();
})();

function loadCourses() {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myCourses = JSON.parse(this.responseText);
      for (let i = 0; i < myCourses.courses.length; i++) {
        $("#courseCardTray").append(
          `<div class="card">
            <div class="cardImg" style="background-image: url(${myCourses.courses[i].image})"></div>
            <span>${myCourses.courses[i].name}</span>
            <button id="btn${myCourses.courses[i].id}" class="cardBtn">SELECT</button>
          </div>`
        );
      }
    }
  };
  xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
  xhttp.send();
}
