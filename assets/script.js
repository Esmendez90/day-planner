// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
$("#currentDay").text(new Date());

// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
var currentHour = new Date().getHours();
var myDailyHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

function dailySchedule() {
  for (var i = 0; i < myDailyHours.length; i++) {
    createTimeContainer();
  }

  // The following function will create each of the containers that we need.
  // Most of the created elements will be appended to the main html tag.
  function createTimeContainer() {
    // Create a div container and append it to the main tag
    var container = $("<div>").addClass("container row");
    $("main").append(container);
    // Create a div for the hour and append it to the container
    var hourContainer = $("<div>").addClass("hour");
    container.append(hourContainer);
    // Display the daily hours into the hourContainer
    hourContainer.text(myDailyHours[i] + ":00");

    // Create a textarea tag and append it to the container
    var textDescription = $("<textarea>").addClass("description").attr("id", i);
    container.append(textDescription);

    // Create a button tag and append it to the container
    var saveBtnContainer = $("<button>").addClass("saveBtn");
    container.append(saveBtnContainer);

    // Create an i tag and append it to the saveBtnContainer
    var saveBtn = $("<i>").addClass("saveTask fa fa-save");
    saveBtn.css("font-size", "30px");
    saveBtnContainer.append(saveBtn);

    // WHEN I view the time blocks for that day
    // THEN each time block is color-coded to indicate whether it is in the past, present, or future.
    if (currentHour === myDailyHours[i]) {
      //console.log("red");
      textDescription.addClass("present");
    } else if (currentHour > myDailyHours[i]) {
      //console.log("grey");
      textDescription.addClass("past");
    } else {
      //console.log("green");
      textDescription.addClass("future");
    }
  }

  // WHEN I click into a time block
  // THEN I can enter an event
  // WHEN I click the save button for that time block
  // THEN the text for that event is saved in local storage
  $("main").click(function (event) {
    event.preventDefault();
    var element = event.target;

    if (element.matches(".saveTask") === true) {
      event.preventDefault();

      var getParent = element.parentNode;

      var getTask = getParent.previousElementSibling.value;

      var storage = JSON.parse(localStorage.getItem("my-tasks"));
      storage.push(getTask);
      localStorage.setItem("my-tasks", JSON.stringify(storage));
      renderTasks();
    }
  });
}

// WHEN I refresh the page
// THEN the saved events persist
function renderTasks() {
  var storage = JSON.parse(localStorage.getItem("my-tasks"));
  for (var i = 0; i < storage.length; i++) {
    $("#" + i).text(storage[i]);
  }
}

// Execute function dailySchedule
dailySchedule();

// Upon loading the page if there isn't a localStorage,
// then a localStorage my-tasks will be created
if (localStorage.getItem("my-tasks") === null) {
  localStorage.setItem("my-tasks", JSON.stringify([]));
}
renderTasks();
