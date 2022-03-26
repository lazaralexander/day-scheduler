// Define global variables
var current_DayEl = $('#currentDay');
var current_TimeEl = $('#currentTime');
var savedData = JSON.parse(localStorage.getItem("savedData"));
var lengthOfDay = 8;

//checks to see if there is localStorage Data
function checkForData() {
    if (savedData == null){
        savedData = [];
        for (let i=0; i<lengthOfDay; i++){
            savedData.push("");
        }
    }
    localStorage.setItem("savedData", JSON.stringify(savedData));
}

//displays the listed hours in the day
function make_Hours () {
    checkForData();
    var time_String = "";
    var currentHour = moment().format("H");
    var currentClass = "past";

    if (currentHour == 8) {
        currentClass = "present";
    } else if (currentHour < 8) {
        currentClass = "future";
    }

    $(".col-10").addClass(currentClass).text(savedData[0]).attr("data-id", 0);
    $(".saveBtn").attr("data-id", 0);

    for (let i=9; i<(9+lengthOfDay); i++) {
        var new_Row = $("<section>").addClass('time-block row description');

        if (i < 12)
        {
            time_String = (i)+ " AM";
        }
        else {
            time_String = (i-11)+ " PM";
        }

        if (currentHour < i+1) {
            currentClass = "future";
        }else if (currentHour == i+1) {
            currentClass = "present";
        }

        var timeEl = $('<div>').addClass('d-flex align-items-center justify-content-center hour col-1').text(time_String);
        var textEl = $('<textarea>').addClass('col-10 '+currentClass).text(savedData[i-8]).attr("data-id", i-8);
        var buttonEl = $('<btn>').addClass('d-flex align-items-center justify-content-center saveBtn col-1').attr("data-id", i-8).text("Save");

        new_Row.append(timeEl, textEl, buttonEl);

        $('.container').append(new_Row);
    }
}

//display the time at the top of the webpage
function displayTime() {
    current_DayEl.text(moment().format('dddd, MMMM Do, YYYY'));
    current_TimeEl.text(moment().format("hh:mm:ss A"));
}

//sends data into localStorage
function saveMe(event) {
    var textToSave = (event.target.parentNode.children[1].value);
    var storageIndex = (event.target.getAttribute("data-id"));

    savedData[storageIndex] = textToSave;

    localStorage.setItem("savedData", JSON.stringify(savedData));
}

setInterval(displayTime, 1000);
make_Hours();
$('.container').on('click', saveMe);