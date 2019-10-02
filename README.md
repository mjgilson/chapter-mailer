# chapter-mailer
Emails chapters of a book sequentially

## Setup
Create a "Chapter Lists" Google Sheet - each sheet should be the exact title of the book, a header row and three columns: "Chapter" (number of each chapter in order, from 1 on), "Title" (of the chapter), and "Document ID" (the Google Docs documentID for the chapter text).

Create a "Daily Email Lists" Google Sheet - again each sheet should be the exact title of the book, with a header row and three columns: "Email Address" (that you're sending it to), "Last Chapter" (initialise this as 0; it's incremented every time an email is sent), and "Active" (TRUE when you're sending emails to them, FALSE when it's paused).

Create a "Monthly Email Lists" Google Sheet - the same as above, but an extra fourth column: "Day of Month" (which day you email the chapter out).

Create a "Send Emails" Google Script file with the contents of "email.gs" - and change the documentIDs of lines 3 (to the ID of your "Daily Email Lists" sheet), 10 (to the ID of your "Monthly Email Lists" sheet), and 18 (to the ID of your "Chapter Lists" sheet). Finally set up a daily trigger for both the "sendDaily" and "sendMonthly" functions – these will scan the respective spreadsheet each day to see if any chapters need to be sent out.
