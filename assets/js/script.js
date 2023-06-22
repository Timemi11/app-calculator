let btnsubmit = document.getElementById("submit");
let form = document.querySelectorAll(".form");
btnsubmit.addEventListener("click", validation);

function validation() {
  let day = document.getElementById("day");
  let month = document.getElementById("month");
  let year = document.getElementById("year");

  //   Label
  let labelday = day.previousElementSibling;
  let labelmonth = month.previousElementSibling;
  let labelyear = year.previousElementSibling;
  //

  //   ERRORMessage
  let errormsday = day.nextElementSibling;
  let errormsmonth = month.nextElementSibling;
  let errormsyear = year.nextElementSibling;
  //

  let Day = day.value;
  let Month = month.value;
  let Year = year.value;

  let date = new Date(Year, Month - 1, Day);
  let currentyear = new Date().getFullYear();
  let i;
  let notError = true;

  //   field is not empty
  if (Day) {
    notError = true;
    day.parentElement.className = "form";
  } else {
    notError = false;
    errormsday.innerHTML = "The field is required";
    day.parentElement.className = "form empty";
  }
  if (Month) {
    notError = true;
    month.parentElement.className = "form";
  } else {
    notError = false;
    errormsyear.innerHTML = "The field is required";
    month.parentElement.className = "form empty";
  }
  if (Year) {
    notError = true;
    year.parentElement.className = "form";
  } else {
    notError = false;
    errormsmonth.innerHTML = "The field is required";
    year.parentElement.className = "form empty";
  }
  //

  //   dmy valid
  if ((Day > 31 || Day <= 0 || isNaN(Number(Day))) && Day) {
    notError = false;
    errormsday.innerHTML = "Must be a valid a day";
    errormsday.parentElement.className = "form valid";
  }
  if ((Month > 12 || Month <= 0 || isNaN(Number(Month))) && Month) {
    notError = false;
    errormsmonth.innerHTML = "Must be a valid month";
    errormsmonth.parentElement.className = "form valid";
  }
  if ((Year > currentyear || isNaN(Number(Year))) && Year) {
    notError = false;
    errormsyear.innerHTML = "Must be in the past";
    errormsyear.parentElement.className = "form valid";
  }
  //

  // it is february
  if (Day >= 29 && Month == 2) {
    notError = false;
    errormsday.innerHTML = "Must be a valid a date";
    for (i = 0; i < form.length; i++) {
      form[i].className = "form error";
    }
  }

  // it is April June September and November
  if (Day >= 31 && [4, 6, 9, 11].includes(Number(Month))) {
    notError = false;
    errormsday.innerHTML = "Must be a valid a date";
    for (i = 0; i < form.length; i++) {
      form[i].className = "form error";
    }
  }

  let outputyears = document.querySelector(".outputyears");
  let outputmonths = document.querySelector(".outputmonths");
  let outputdays = document.querySelector(".outputdays");

  let currentmonth = new Date().getMonth() + 1;
  let currentday = new Date().getDate();

  let ageYears = currentyear - Year;
  let ageMonths = currentmonth - Month;
  let ageDays = currentday - Day;

  if (ageDays < 0) {
    ageMonths--; // ลดค่าเดือนไป 1 เมื่อวันลบค่าแล้วน้อยกว่า 0
    const daysInPreviousMonth = new Date(
      currentyear,
      currentmonth - 1,
      0
    ).getDate(); // ถ้ากำหนดค่าวันเป็น 0 จะได้ค่าวันท้ายของเดือนนั้นๆ
    console.log(daysInPreviousMonth);
    ageDays += daysInPreviousMonth; // Add the days of the previous month
  }

  if (ageMonths < 0) {
    ageYears--; // Subtract 1 year
    ageMonths += 12; // Add 12 months
  }

  if (notError) {
    outputyears.innerHTML = ageYears;
    outputmonths.innerHTML = ageMonths;
    outputdays.innerHTML = ageDays;
  } else {
    outputyears.innerHTML = "--";
    outputmonths.innerHTML = "--";
    outputdays.innerHTML = "--";
  }
}
