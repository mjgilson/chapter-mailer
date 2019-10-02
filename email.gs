function sendDaily() {

  sendEmails('1UrAaHdAX8ChmE4S-EQCX_3dReg8ocJVJ1T85DHJgZEY', false);

}


function sendMonthly() {

  sendEmails('1TcmBh30Qx6tF7EMlX03MtYuby8pUxfQUHS_D9yyLR_A', true);

}


function sendEmails(emailListId, testMonthDay) {
  // Open email and chapter list spreadsheets
  var ssEmailList = SpreadsheetApp.openById(emailListId);
  var ssChapterList = SpreadsheetApp.openById('1NdGzmuZPRo1C72AVkaQ8UtC8_bPcL60fSPfGWWS3LF4');

  // Get the number of sheets
  var sheetsNum = ssEmailList.getNumSheets();

  // Loop within sheets
  for (isheet = 0; isheet < sheetsNum; isheet++) { 

    // Open relevant sheets and get story name
    var sheetEmailList = ssEmailList.getSheets()[isheet];
    var textTitle = sheetEmailList.getName();
    var sheetChapters = ssChapterList.getSheetByName(textTitle);
    
    // Get number of readers and chapters from number of rows in sheets
    var noReaders = sheetEmailList.getLastRow();
    var noChapters = sheetChapters.getLastRow() - 1;

    // Loop within rows
    for (iRow = noReaders; iRow > 1; iRow--) {

      // Check if active, and...
      if (sheetEmailList.getRange(iRow, 3).getValue()) {
      // Calculate day, and if we're sending monthly, whether it's the right day, or final day of month for Feb and 31sts
      var todaysDate = new Date();
      var testTomorrow = new Date();
      testTomorrow.setDate(testTomorrow.getDate()+1);
      var finalDay = !(todaysDate.getMonth() == testTomorrow.getMonth());
      if (!testMonthDay || (sheetEmailList.getRange(iRow,4).getValue() == todaysDate.getDate() || (sheetEmailList.getRange(iRow,4).getValue() > todaysDate.getDate() && finalDay == true ) ) ) {
 
        // Get email address
        var readerEmail = sheetEmailList.getRange(iRow, 1).getValue();

        // Get and increment current chapter
        var readerChapter = sheetEmailList.getRange(iRow, 2).getValue() + 1;

        // Set chapter as body text
        var chapterFileId = sheetChapters.getRange(readerChapter + 1, 3).getValue();
        var chapterFile = DriveApp.getFileById(chapterFileId);
        var emailBody = chapterFile.getBlob().getDataAsString();

        // Check if final chapter
        if (noChapters > readerChapter){

          // Set typical email subject
          var emailSubject = textTitle + ': Chapter ' + readerChapter + ' “' + sheetChapters.getRange(readerChapter + 1, 2).getValue() + '”';

          // Save incremented current chapter
          sheetEmailList.getRange(iRow, 2).setValue(readerChapter);

        } else {

          // Set final email subject and body
          var emailSubject = textTitle + ': Final Chapter! “' + sheetChapters.getRange(readerChapter + 1, 2).getValue() + '”';

          // Delete row
          sheetEmailList.deleteRow(iRow);

        }

        // Send email
        MailApp.sendEmail({name: "Dreadful Penny", to: readerEmail, subject: emailSubject, htmlBody: emailBody});

      } }

    }

  }

}
