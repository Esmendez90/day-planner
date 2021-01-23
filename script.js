// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
$("#currentDay").text(new Date());

// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
var currentHour = new Date().getHours();
console.log("Current hour is: " + currentHour + ":00");
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
    var textDescription = $("<textarea>")
      .addClass("description")
      .attr("data-index", i);
    container.append(textDescription);

    // Create a button tag and append it to the container
    var saveBtnContainer = $("<button>").addClass("saveBtn");
    container.append(saveBtnContainer);

    // Create an i tag and append it to the saveBtnContainer
    var saveBtn = $("<i>").addClass("fa fa-save");
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
    //console.log(element);

    if (element.matches("button") === true) {
      //console.log("this is a button");
      var dailytask = element.previousElementSibling.value;
      //console.log(dailytask);
      var storage = JSON.parse(localStorage.getItem("my-tasks"));
      storage.push(dailytask);
      localStorage.setItem("my-tasks", JSON.stringify(storage));
      renderTasks();
    }
  });

  function renderTasks() {
    var storage = JSON.parse(localStorage.getItem("my-tasks"));
    event.preventDefault();
    console.log(storage);
    for (var i = 0; i < storage.length; i++) {
      console.log(storage[i]);
      $("textarea").text(storage[i]); //NEED HELP WITH THIS!!!!
    }
  }
}

// Execute function dailySchedule
dailySchedule();

if (localStorage.getItem("my-tasks") === null) {
  localStorage.setItem("my-tasks", JSON.stringify([]));
}

// WHEN I refresh the page
// THEN the saved events persist
