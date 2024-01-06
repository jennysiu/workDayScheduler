//! Display the current day at the top of the calender when a user opens the planner.

//! Present time blocks for standard business hours when the user scrolls down.

// Color-code each time block based on past, present, and future when the time block is viewed.

//! Allow a user to enter an event when they click a time block

// Save the event in local storage when the save button is clicked in that time block.

// Persist events between refreshes of a page

// jQuery selectors
const currentDay = $("#currentDay");
const timeBlocks = $(".time-blocks");

// assign global variables


// shows current day and time at the top of page
function showCurrentTime() {
  var now = dayjs().format("DD MMMM YYYY, HH:mm:ss A");
  currentDay.text(now);
  
  // set interval so seconds autorefreshes
  setInterval(showCurrentTime, 1000);
}
showCurrentTime();

// set hours for timeblocks
const hours = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

// dynamically generate timeblocks
hours.forEach(hour => {
  // generate blocks
  let timeBlock = $("<div></div>")
  .addClass("timeBlock");
  timeBlocks.append(timeBlock);

  // display hours
  let displayHour = $("<p>")
  .addClass("hour")
  .text(`${hour}:00`);
  timeBlock.append(displayHour);


  // generate blocks
  let textBlock = $("<input>");
  textBlock.addClass("textBlock")
  .attr("id", hour)
  .text("test writing")
  // .attr("placeholder", "Enter event here")
  timeBlock.append(textBlock)

  var currentHour = dayjs().format("HH");
  console.log(currentHour)

  // change colours based on hour relative to time
  if (hour == currentHour) {
    textBlock.addClass("present");
  } else if (hour < currentHour) {
    textBlock.addClass("past");
  } else if (hour > currentHour) {
    textBlock.addClass("future")
  }

  // append save button
  let saveBtn = $("<button>");
  saveBtn.addClass("saveBtn")
  timeBlock.append(saveBtn);

});

function blockColourCode() {
  // grey means past


  // yellow means now

  // green means future
}