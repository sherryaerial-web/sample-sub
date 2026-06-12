function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!e || !e.parameter || Object.keys(e.parameter).length === 0) {
    return ContentService.createTextOutput("✅ Sherry Aerial Studio - 系統連線正常").setMimeType(ContentService.MimeType.TEXT);
  }
  var action = e.parameter.action;
  try {
    if (action === 'getTeachers') {
      var sheet = ss.getSheetByName("老師名單"); 
      var data = sheet.getDataRange().getValues();
      var headers = data.shift();
      var json = data.map(r => {
        var obj = {};
        headers.forEach((h, i) => obj[h] = r[i]);
        return obj;
      }).filter(o => o["指導者"] && o["指導者"].toString().trim() !== ""); 
      return createJsonResponse(json);
    }
    if (action === 'getCourseList') {
      var sheet = ss.getSheetByName("CourseList");
      var data = sheet.getDataRange().getValues();
      var headers = data.shift();
      var json = data.map(r => {
        return { "日期": formatMyDate(r[0]), "時間": formatMyTime(r[1]), "課程": r[2], "指導者": r[3] };
      });
      return createJsonResponse(json);
    }
    if (action === 'getPendingLeaves') {
      var sheet = ss.getSheetByName("工作表1");
      var data = sheet.getDataRange().getValues();
      data.shift();
      var pending = data.filter(r => r[5] === "確認中").map(r => {
        return { "原老師": r[1], "日期": formatMyDate(r[2]), "時段": formatMyTime(r[3]), "課程": r[4] };
      });
      return createJsonResponse(pending);
    }
    if (action === 'getMySubs') {
      var teacherName = e.parameter.name;
      var sheet = ss.getSheetByName("工作表1");
      var data = sheet.getDataRange().getValues();
      data.shift();
      var mySubs = data.filter(r => r[6] === teacherName && r[5] === "已領取").map(r => {
         return { "日期": formatMyDate(r[2]), "時段": formatMyTime(r[3]), "課程": r[4], "原老師": r[1] };
      });
      return createJsonResponse(mySubs);
    }
    if (action === 'submitLeave') {
      var instructor = e.parameter.instructor;
      var items = JSON.parse(e.parameter.items);
      var sheet = ss.getSheetByName("工作表1");
      var now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
      items.forEach(function(item) {
        // [登記時間, 原老師, 日期, 時段, 課程, 狀態, 代課老師, 備註, 入系統]
        sheet.appendRow([now, instructor, item["日期"], item["時間"], item["課程"], "確認中", "", "", ""]);
      });
      return createJsonResponse({ status: "success" });
    }
    if (action === 'submitClaim') {
      var subTeacher = e.parameter.subTeacher;
      var items = JSON.parse(e.parameter.items);
      var sheet = ss.getSheetByName("工作表1");
      var data = sheet.getDataRange().getValues();
      for (var i = data.length - 1; i > 0; i--) {
        var row = data[i];
        if (row[5] === "確認中") {
          var match = items.find(item => item["日期"] === formatMyDate(row[2]) && item["時段"] === formatMyTime(row[3]) && item["課程"] === row[4]);
          if (match) {
            sheet.getRange(i + 1, 6).setValue("已領取");
            sheet.getRange(i + 1, 7).setValue(subTeacher);
          }
        }
      }
      return createJsonResponse({ status: "success" });
    }
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function formatMyDate(val) {
  if (!val) return "";
  if (val instanceof Date) return Utilities.formatDate(val, Session.getScriptTimeZone(), "yyyy/MM/dd");
  var str = val.toString();
  if(str.indexOf("T") > -1) return str.split("T")[0].replace(/-/g, "/");
  return str;
}

function formatMyTime(val) {
  if (!val) return "";
  if (val instanceof Date) return Utilities.formatDate(val, Session.getScriptTimeZone(), "HH:mm");
  var str = val.toString();
  if(str.indexOf("1899-12-30T") > -1) return str.split("T")[1].substring(0, 5);
  return str;
}
