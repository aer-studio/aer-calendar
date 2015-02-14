/**
 *
 * Aer Calendar v1.0
 * -----------------
 * Aer Calendar is a JavaScript library that allows for easy generation of
 * calendars using a constructor.
 *
 * License
 * -------
 * Copyright (c) 2015, Aer Studio and Zac Canoy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

var aerCalendarMonthNames = ['January', 'February', 'March', 'April', 'May',
                             'June', 'July', 'August', 'September', 'October',
                             'November', 'December'];

function Calendar(elementId, year, month) {

  /**                    **\
   *   INITIAL HANDLING   *
  \**                    **/

  // Setting params to scoped vars
  this.year = year;
  this.month = month;
  this.element = document.getElementById(elementId);

  // If there are numbers outside the bounds allowed, return an error
  if(month < 0 || year < 0 || month > 12) {
    console.error('The year and/or month are outside the bounds.');
  }
  // If the year or month are not provided, set them to the current day
  if(year == null) {
    year = new Date().getFullYear();
  }
  if(month == null) {
    month = new Date().getMonth();
  }


  /**                             **\
   *   HELPER AND USER FUNCTIONS   *
  \**                             **/

  this.getDaysInMonth = function() {
    return Math.floor((new Date(this.year, this.month, 0) - new Date(this.year, this.month - 1, 1)) / 86400000) + 1;
  };
  this.getMonthName = function() {
    return aerCalendarMonthNames[this.month - 1];
  }


  /**                       **\
   *   CALENDAR GENERATION   *
  \**                       **/

  this.generate = function() {
    /**
     *   output ---- the output string from the calendar generation
     *   cellIndex - stores which cell the generator is currently in
     *   dayIndex -- stores which day the generator is currently in
     */
    var output, cellIndex, dayIndex;

    // Generate the header
    var output = '<table class=\'aer-calendar\'><div>' + this.getMonthName() + ' ' + this.year + '</div><div><button class=\'aer-calendar-prev-button\'>Prev</button><button class=\'aer-calendar-next-button\'>Next</button></div><thead><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead><tbody><tr>';

    // Make empty cells before the start of the month
    for(cellIndex = 1; cellIndex <= new Date(this.year, this.month - 1, 1).getDay(); cellIndex++) {
      output += '<td></td>';
    }

    // Fill in the days of the month
    for(dayIndex = 1; dayIndex <= this.getDaysInMonth(this.year, this.month); cellIndex++, dayIndex++) {
      output += '<td>' + dayIndex + '</td>';

      // Make a new row when the day is a multiple of seven
      if(cellIndex % 7 === 0 && dayIndex != this.getDaysInMonth(this.year, this.month)) {
        output += '</tr><tr>';
      }

      // End generation on the last day of the month
      else if (dayIndex == this.getDaysInMonth(this.year, this.month)) {
        output += '</tr></tbody></table>';
      }
    }
    // Return the string of DOM for handling by other scripting
    this.element.innerHTML = output;
  };


  /**                                **\
   *   BUTTON HANDLING AND FUNTIONS   *
  \**                                **/

  this.element.addEventListener('click', function(event) {
    this.handleButtonEvents(event)
  }.bind(this));

  this.handleButtonEvents = function(event) {
    target = event.target.className;

    if(target == 'aer-calendar-prev-button') {
      if(this.month == 1) {
        this.year -= 1;
        this.month = 12;
      } else {
        this.month -= 1;
      }
    } else if(target == 'aer-calendar-next-button') {
      if(this.month == 12) {
        this.year += 1;
        this.month = 1;
      } else {
        this.month += 1;
      }
    }

    this.generate();
  }
}