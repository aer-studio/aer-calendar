/**
 *
 * Aer Calendar v0.1.3
 * -------------------
 * A calendar plugin that extends jQuery to add a generateCalendar() function,
 * adds a <calendar> element through jQuery and provides a generate() function
 * to allow use outside of jQuery.
 *
 * Future Additions
 * ----------------
 * -Generated month changing buttons with handlers
 * -Animations on month change
 * -Maybe add calendar helper functions to allow for getting calendar
 *    information
 * -Maybe classes for cells to differentiate between them.
 * -Google calendar API support for easy integration
 *
 * Changes Since Last Major Version
 * --------------------------------
 * v0.1.1
 * -Changed 'Calendar' to 'calendar' so there's no confusion that it's not a
 *    constructor.
 * v0.1.2
 * -Added support for multiple calendars declared in the DOM. All three methods
 *    of calendar generation can now make multiple calendars.
 * v0.1.3
 * -Removed redundant each() functions in $generate().
 * -Cleaned code
 * -Improved comments
 */

var calendar = {

  // Returns the number of days in a month
  getDaysInMonth: function(year, month) {

    return Math.floor((new Date(year, month, 0) - new Date(year, month - 1, 1)) / 86400000) + 1;

  },

  // Generates the DOM for a calendar
  generate: function(year, month) {

    /**
     * c - for storing the string to be passed to append to make the
     *     calendar. TODO: See if there is a better way to represent DOM with
     *     this string.
     *
     * i - an index for storing which cell the generator is in.
     *
     * d - an index for storing which day the generator is in.
     */
    var c, i, d;


    // If not passed any variables, default to the present day
    if(year == null && month == null) {
      var o = new Date();
      year = o.getFullYear();
      month = o.getMonth() + 1;
    }


    // If one variable is passed, an error is thrown
    // TODO: Default to present month or year when it's excluded.
    else if(year ? !month : month)
      $.error('Only one variable passed to function generateCalendar, or a variable passed is 0\nSyntax:\n  $(selector).generateCalendar(<year>, <month>) OR\n  $(selector).generateCalendar()');

    // If a variable outside the allowed bounds is passed, an error is thrown
    else if(year < 0 || month < 0 || month > 12)
      $.error('One or more variables have exceeded or are beneath the allowed bounds');
    cal = '<table><thead><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr></thead><tbody><tr>';


    // Make empty cells for days before the month starts
    for(i = 1; i <= new Date(year, month - 1, 1).getDay(); i++)
      cal += '<td></td>';

    // Fill in the days of the month
    for(d = 1; d <= calendar.getDaysInMonth(year, month); i++, d++) {
      cal += '<td>' + d + '</td>';
      
      // Make a new row when the day is a multiple of seven
      if(i % 7 == 0 && d != calendar.getDaysInMonth(year, month))
        cal += '</tr><tr>';
      
      // End generation on the last day of the month
      else if (d == calendar.getDaysInMonth(year, month)) {
        cal += '</tr></tbody</table>';
      }
    }
    // Return the string of DOM for handling by other scripting
    return cal;
  },

  // Extends jQuery to allow easy calendar generation on any selector
  $generate: function(year, month) {
    $(this).html(calendar.generate(year, month));
  }
}

// Tests if jQuery is loaded
if($) {
  // Code ran when the document is loaded
  $(function() {

    // Extends jQuery to add a generateCalendar method
    $.fn.generateCalendar = calendar.$generate;

    // For each instance of a calendar in DOM, generate a calendar
    $('calendar').each(function(){
      var a = $(this);
      a.generateCalendar(a.attr('year'), a.attr('month'));
    });
  });
}