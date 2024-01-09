// jQuery selectors
const currentDay = $("#currentDay");
const timeBlocksEl = $(".time-blocks");
const saveBtnEl = $(".saveBtn");
const textBlockEl = $(".texBlock")
const clearBtnEl = $(".clear-events button")

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

  // retrieve any data from local storage
  var savedEvent = localStorage.getItem(hour);

  // generate blocks
  let textBlock = $("<input>");
  textBlock.addClass("textBlock")
  .attr("id", hour)
  .val(savedEvent)
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

  // store in local storage, set key as the hour
  localStorage.setItem(linkedHour, eventName);
});

// clear all events function 
$('.clearBtn').click(function() {
  localStorage.clear();
  $('.textBlock').val('');
});