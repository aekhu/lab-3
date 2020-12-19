"use strict";


var DatePicker = function DatePicker(id, callback) {
  this.id = id;
  this.callback = callback;
};

DatePicker.prototype.monthName = function monthName(monthIndex) {
  var monthNames = ["January","February","March","April", "May","June","July",
                    "August","September","October","November","December",];
                     return monthNames[monthIndex];
};

DatePicker.prototype.renderTable = function renderTable(monthName, year) {
  document.getElementById(this.id).innerHTML = [
    "<table>",
    "<thead>",
    '<tr class="header">', '<td class="prev"><</td>',
        '<th colspan="5">',monthName," ", year,"</th>",
         '<td class="next">></td>',
    "</tr>",
    '<tr class="week">',
    '<td class="r">Sun</td>',
        "<td>Mon</td>",
        "<td>Tue</td>",
        "<td>Wed</td>",
        "<td>Thu</td>",
        "<td>Fri</td>",
        "<td>Sat</td>",
    "</tr>",
    "</thead>",
    "<tbody>",
    "</tbody>",
    "</table>",
  ].join("");
};

DatePicker.prototype.render = function render(date, n = 0) {
  var month = date.getMonth() + 1,
    day = date.getDate(),
    year = date.getFullYear(),
    monthIndex = date.getMonth(),
    that = this,
    tempDate = new Date(year, monthIndex, day),
    tempDay = tempDate.getDate(),
    calendarBody,
    daysHtml = "",
    i,
    selectables,
    selectableHandler;

  console.log(day);

  this.callback(this.id, { month: month, day: day, year: year });

  this.renderTable(this.monthName(monthIndex), year);

  document.querySelector("#" + this.id + " .prev")
    .addEventListener("click", function () {
      that.render(new Date(year, monthIndex - 1), 1);
    });
  document.querySelector("#" + this.id + " .next")
    .addEventListener("click", function () {
      that.render(new Date(year, monthIndex + 1), 1);
    });

  tempDate.setDate(1);
  if (tempDate.getDay() !== 0) {
    tempDate.setDate(1 - tempDate.getDay());
  }

  calendarBody = document.querySelector("#" + this.id + " tbody");
  while (tempDate.getMonth() % 12 !== (monthIndex + 1) % 12) {
    daysHtml += "<tr>";
    for (i = 0; i < 7; i++) {
      tempDay = tempDate.getDate();
      if (tempDate.getMonth() !== monthIndex) {
        daysHtml += '<td class="dimmed">' + tempDay + "</td>";
      } else if (tempDay === day && n == 0) {
        daysHtml += '<td class="active">' + tempDay + "</td>";
      } else if (tempDay === day && n == 1) {
        daysHtml += '<td class= "selected">' + tempDay + "</td>";
        n = 0;
      } else {
        daysHtml += '<td class="selected">' + tempDay + "</td>";
      }
      tempDate.setDate(tempDay + 1);
    }
    daysHtml += "</tr>";
  }
  calendarBody.innerHTML = daysHtml;

  selectables = document.querySelectorAll("#" + this.id + " .selected");
  selectableHandler = function selectableHandler(event) {
    that.render(new Date(year, monthIndex, event.target.textContent), 0);
  };
  for (i = 0; i < selectables.length; i++) {
    selectables[i].addEventListener("click", selectableHandler);
  }
};