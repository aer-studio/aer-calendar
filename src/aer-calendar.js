/**
 *
 * Aer Calendar v2.1
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
 *
 * TODO
 * ----
 * -Add the following arguments to the constructor when an object is passed in:
 *   -useDivs || useDivsOnly: when true, don't use p and h1 elements for events
 *   -noStyling: don't use any internal styles
 *   -theme: for use with themes that may be added in the future
 */

/**               **\
 *   HELPER CODE   *
\**               **/

var aerCalendarMonthNames = ['January', 'February', 'March', 'April', 'May',
                             'June', 'July', 'August', 'September', 'October',
                             'November', 'December'];

function Calendar() {

  /**                    **\
   *   INITIAL HANDLING   *
  \**                    **/
  this.gapiEnabled = false;
  if (
    arguments.length == 1 &&
    typeof arguments[0] == 'string'
  ) {
    this.element = document.getElementById(arguments[0]);
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();
  } else if (
    arguments.length == 2 &&
    typeof arguments[0] == 'string' &&
    typeof arguments[1] == 'number'
  ) {
    this.element = document.getElementById(arguments[0]);
    this.month = arguments[1];
    this.year = new Date().getFullYear();
  } else if (
    arguments.length == 3 &&
    typeof arguments[0] == 'string' &&
    typeof arguments[1] == 'number' &&
    typeof arguments[2] == 'number'
  ) {
    this.element = document.getElementById(arguments[0]);
    this.month = arguments[1];
    this.year = arguments[2];
  } else if (
    arguments.length = 1 &&
    typeof arguments[0] == 'object' &&
    typeof arguments[0].calendarElemId == 'string'
  ) {
    var arg = arguments[0];

    this.element = document.getElementById(arg.calendarElemId);
    this.eventElement = document.getElementById(arg.eventElemId);

    if (typeof arg.month == 'number') {
      this.month = arg.month;
    } else {
      this.month = new Date().getMonth() + 1;
    }

    if (typeof arg.year == 'number') {
      this.year = arg.year;
    } else {
      this.year = new Date().getFullYear();
    }

    if (
      typeof arg.apiKey == 'string' &&
      typeof arg.calendarId == 'string'
    ) {
      this.apiKey = arg.apiKey;
      this.calendarId = arg.calendarId;
      this.gapiEnabled = true;
    }

    if (arg.generate === false) {
      this.autoGenerate = false;
    } else {
      this.autoGenerate = true;
    }

    if (arg.useDivs === true || arg.useDivsOnly === true) {
      this.useDivs = true;
    } else {
      this.useDivs = false;
    }
  }

  this.gNames = [];
  this.gDescriptions = [];
  this.gStartDates = [];
  this.gEndDates = [];

  // If there are numbers outside the bounds allowed, return an error
  if (this.month < 0 || this.year < 0 || this.month > 12) {
    console.error('The year and/or month are outside the bounds.');
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
   *   CALENDAR GENERATION   **
  \**                       **/

  this.generate = function() {
    
    var output, cellIndex, dayIndex;

    var output = '<table class="aer-calendar"><div>' + this.getMonthName() + ' ' + this.year + '</div><div class="aer-calendar-button-container"><button class="aer-calendar-prev-button">Prev</button><button class="aer-calendar-next-button">Next</button></div><thead class="aer-calendar-table-head"><tr "aer-calendar-weekday-row"><th class="aer-calendar-weekday">S</th><th class="aer-calendar-weekday">M</th><th class="aer-calendar-weekday">T</th><th class="aer-calendar-weekday">W</th><th class="aer-calendar-weekday">T</th><th class="aer-calendar-weekday">F</th><th class="aer-calendar-weekday">S</th></tr></thead><tbody class="aer-calendar-table-body"><tr class="aer-calendar-day-row">';

    for (
      cellIndex = 1;
      cellIndex <= new Date(this.year, this.month - 1, 1).getDay();
      cellIndex++
    ) {
      output += '<td class="aer-calendar-day aer-calendar-empty-day"></td>';
    }

    for (
      dayIndex = 1;
      dayIndex <= this.getDaysInMonth(this.year, this.month);
      cellIndex++, dayIndex++
    ) {
      var eventCounter = 0;
      var eventNumber = -1;
      var dayHasEvent = false;

      for (var i = 0; i < this.gStartDates.length; i++) {
        if (
          this.year == this.gStartDates[i].getFullYear() &&
          this.month == this.gStartDates[i].getMonth() + 1 &&
          dayIndex == this.gStartDates[i].getDate()
        ) {
          dayHasEvent = true;
        }
      }

      if (dayHasEvent == true) {
        output += '<td class="aer-calendar-day aer-calendar-event-day" style="color:red;cursor:pointer">';
        output += dayIndex;
        output += '</td>';
      } else {
        output += '<td class="aer-calendar-day">' + dayIndex + '</td>';
      }

      if (cellIndex % 7 === 0 && dayIndex != this.getDaysInMonth(this.year, this.month)) {
        output += '</tr><tr class="aer-calendar-day-row">';
      } else if (dayIndex == this.getDaysInMonth(this.year, this.month)) {
        output += '</tr></tbody></table>';
      }
    }

    this.element.innerHTML = output;
  };

  this.generateEvent = function(d, n) {

    var output = '';
    var i;
    for (i = d; i <= d + n; i++) {
      if (this.useDivs === true) {
        if (typeof this.gNames[i] === 'string') {
          output += '<div class="aer-calendar-event-name">' + this.gNames[i] + '</div>';
        } else {
          output += '<div class="aer-calendar-event-name">No Title</div>';
        }
        if (typeof this.gDescriptions[i] === 'string') {
          output += '<div class="aer-calendar-event-description">' + this.gDescriptions[i] + '</div>';
        } else {
          output += '<div class="aer-calendar-event-description">No Description</div>';
        }
        output += '<div class="aer-calendar-event-start-time">' + this.gStartDates[i].getHours() + ':' + this.gStartDates[i].getMinutes() + '</div>';
        output += '<div class="aer-calendar-event-end-time">' + this.gEndDates[i].getHours() + ':' + this.gEndDates[i].getMinutes() + '</div>';
      } else {
        if (typeof this.gNames[i] === 'string') {
          output += '<h1 class="aer-calendar-event-name">' + this.gNames[i] + '</h1>';
        } else {
          output += '<h1 class="aer-calendar-event-name">No Title</h1>';
        }
        if (typeof this.gDescriptions[i] === 'string') {
          output += '<p class="aer-calendar-event-description">' + this.gDescriptions[i] + '</p>';
        } else {
          output += '<p class="aer-calendar-event-description">No Description</p>';
        }
        output += '<p class="aer-calendar-event-start-time">' + this.gStartDates[i].getHours() + ':' + this.gStartDates[i].getMinutes() + '</p>';
        output += '<p class="aer-calendar-event-end-time">' + this.gEndDates[i].getHours() + ':' + this.gEndDates[i].getMinutes() + '</p>';
      }
    }

    this.eventElement.innerHTML = output;
  }


  /**                                **\
   *   BUTTON HANDLING AND FUNTIONS   *
  \**                                **/

  this.element.addEventListener('click', function(event) {
    this.handleButtonEvents(event)
  }.bind(this));

  this.handleButtonEvents = function(e) {

    if (e.target.className == 'aer-calendar-prev-button') {
      if (this.month == 1) {
        this.year -= 1;
        this.month = 12;
      } else {
        this.month -= 1;
      }
      this.generate();
    } else if (e.target.className == 'aer-calendar-next-button') {
      if (this.month == 12) {
        this.year += 1;
        this.month = 1;
      } else {
        this.month += 1;
      }
      this.generate();
    }
    if (this.gapiEnabled) {
      var c, d;
      var n = -1;
      for (var i = 0; i < this.gStartDates.length; i++) {
        c = this.gStartDates[i] - new Date(this.year, this.month - 1, e.target.innerHTML);
        if (c < 86400000 && c >= 0) {
          if (n == -1) {
            d = i;
          }
          n++;
        }
      }
      this.generateEvent(d, n);
   }
  };


  /**                 **\
   *   GAPI HANDLING   *
  \**                 **/
  this.gapi = function() {
    if (this.gapiEnabled === true) {
      var requestObject = {
        calendarId: this.calendarId
      }
      gapi.client.setApiKey(this.apiKey);
      gapi.client.load('calendar', 'v3', function() {
        gapi.client.calendar.events.list(requestObject).execute(function (response) {
          this.gCalendar = response.items;
          for (var i = 0; i < this.gCalendar.length; i++) {
            this.gNames[i] = this.gCalendar[i].summary;
            this.gDescriptions[i] = this.gCalendar[i].description;
            this.gStartDates[i] = new Date(this.gCalendar[i].start.dateTime);
            this.gEndDates[i] = new Date(this.gCalendar[i].end.dateTime);
          }
          if (this.autoGenerate) {
            this.generate();
          }
        }.bind(this));
      }.bind(this));
    } else {
      console.error('You haven\'t specified both a calendar ID and an API key')
    }
  };

  if (
    this.autoGenerate === true &&
    this.gapiEnabled == false
  ) {
    this.generate();
  }
};