// Display the current day at the top of the calender when a user opens the planner.

// jQuery selectors
const currentDay = $("#currentDay");

function showCurrentTime() {
  var now = dayjs().format("DD MMMM YYYY, HH:mm:ss A");
  currentDay.text(now);
  
  // set interval so seconds autorefreshes
  setInterval(showCurrentTime, 1000);
}

showCurrentTime();
// Present time blocks for standard business hours when the user scrolls down.

// Color-code each time block based on past, present, and future when the time block is viewed.

// Allow a user to enter an event when they click a time block

// Save the event in local storage when the save button is clicked in that time block.

// Persist events between refreshes of a page