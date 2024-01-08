//! Display the current day at the top of the calender when a user opens the planner.

//! Present time blocks for standard business hours when the user scrolls down.

//! Color-code each time block based on past, present, and future when the time block is viewed.

//! Allow a user to enter an event when they click a time block

// Save the event in local storage when the save button is clicked in that time block.

// Persist events between refreshes of a page

// jQuery selectors
const currentDay = $("#currentDay");
const timeBlocksEl = $(".time-blocks");
const saveBtnEl = $(".saveBtn");
const textBlockEl = $(".texBlock")

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
  timeBlocksEl.append(timeBlock);

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
  timeBlock.append(textBlock);



  var currentHour = dayjs().format("HH");
  // convert hours to integers so we can use comparison logics
  var intHour = parseInt(hour);
  var intCurrentHour = parseInt(currentHour);

  textBlock.removeClass("present past future")
  // removes any pre-existing classes names present, past, and future for textBlock
  // before adding appropriate ones

  // change block colours based on hour relative to time
  if (intHour == intCurrentHour) {
    textBlock.addClass("present");
  } else if (intHour < intCurrentHour) {
    textBlock.addClass("past");
  } else if (intHour > intCurrentHour) {
    textBlock.addClass("future")
  }

  // append save button
  const saveBtn = $("<button>");
  saveBtn.addClass("saveBtn");
  timeBlock.append(saveBtn);

});

// save function 
timeBlocksEl.on("click", ".saveBtn", function() {
  // "this" refer to the button clicked 
  var thisSaveBtn = $(this);

  // to get associated textBlock
  var linkedTextBlock = thisSaveBtn.siblings(".textBlock");
  
  // associated hour
  var linkedHour = $(linkedTextBlock).attr('id');

  // retrieves user input as the eventName
  var eventName = linkedTextBlock.val().trim();

  // store in local storage
  localStorage.setItem(linkedHour, eventName);
});
