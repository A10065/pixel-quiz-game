/**
 * Google Apps Script 闖關問答遊戲後端
 * 負責：隨機撈取題目、計算成績並記錄玩家數據
 */

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
const SHEET_QUESTIONS = "題目";
const SHEET_ANSWERS = "回答";

/**
 * GET 請求：撈取隨機 N 題
 * 參數：count (想要幾題)
 */
function doGet(e) {
  const count = parseInt(e.parameter.count || 10);
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_QUESTIONS);
  const data = sheet.getDataRange().getValues();
  
  // 第一列是標頭：題號、題目、A、B、C、D、解答
  const headers = data[0];
  const questions = data.slice(1).map(row => {
    return {
      id: row[0],
      text: row[1],
      options: {
        A: row[2],
        B: row[3],
        C: row[4],
        D: row[5]
      }
      // 此處不回傳解答欄位 (row[6])，以防作弊
    };
  });

  // 隨機選取
  const shuffled = questions.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: selected
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST 請求：接收回答、比對成績、更新玩家記錄
 * Payload: { playerId: 'xxx', answers: { '1': 'A', '2': 'B' ... } }
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const { playerId, answers } = payload;
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // 1. 比對正確答案
    const qSheet = ss.getSheetByName(SHEET_QUESTIONS);
    const qData = qSheet.getDataRange().getValues();
    let score = 0;
    let totalQuestions = 0;

    // 建立題號對應答案的 map
    const answerMap = {};
    for (let i = 1; i < qData.length; i++) {
        answerMap[qData[i][0]] = qData[i][6]; // 假設第 0 欄是題號，第 6 欄是解答
    }

    // 計算分數
    for (let qId in answers) {
        totalQuestions++;
        if (answers[qId] === answerMap[qId]) {
            score++;
        }
    }
    
    const finalScore = Math.round((score / totalQuestions) * 100);
    const passThreshold = 60; // 預設門檻 (可透過全域變數設定)
    const isPassed = finalScore >= passThreshold;

    // 2. 更新「回答」工作表
    const aSheet = ss.getSheetByName(SHEET_ANSWERS);
    if (!aSheet) {
        // 如果表不存在，建立之
        // ID、闖關次數、總分 (最近)、最高分、第一次通關分數、花了幾次通關、最近遊玩時間
        ss.insertSheet(SHEET_ANSWERS).appendRow(['ID', '闖關次數', '總分', '最高分', '第一次通關分數', '花了幾次通關', '最近遊玩時間']);
    }
    
    const aData = aSheet.getDataRange().getValues();
    let playerRowIndex = -1;
    for (let i = 1; i < aData.length; i++) {
        if (aData[i][0] === playerId) {
            playerRowIndex = i + 1;
            break;
        }
    }

    const now = new Date();
    if (playerRowIndex === -1) {
        // 新玩家
        // 第一次通關分數與花了幾次通關，如果是第一次就通過則記錄之
        const firstPassScore = isPassed ? finalScore : "";
        const attemptsToPass = isPassed ? 1 : 0;
        aSheet.appendRow([playerId, 1, finalScore, finalScore, firstPassScore, attemptsToPass, now]);
    } else {
        // 既有玩家
        const row = aData[playerRowIndex - 1];
        const playCount = parseInt(row[1]) + 1;
        const highScore = Math.max(parseInt(row[3]) || 0, finalScore);
        
        // 第一次通關分數處理
        let firstPassScore = row[4];
        let attemptsToPass = parseInt(row[5]) || 0;
        
        if (isPassed && !firstPassScore) {
            firstPassScore = finalScore;
            attemptsToPass = playCount; // 這次才通關
        } else if (!firstPassScore) {
            // 還沒通關，維持為 0
            attemptsToPass = 0;
        }

        // 更新該列
        aSheet.getRange(playerRowIndex, 2).setValue(playCount); // 闖關次數
        aSheet.getRange(playerRowIndex, 3).setValue(finalScore); // 最近總分
        aSheet.getRange(playerRowIndex, 4).setValue(highScore);  // 最高分
        aSheet.getRange(playerRowIndex, 5).setValue(firstPassScore); // 第一次通關分數
        aSheet.getRange(playerRowIndex, 6).setValue(attemptsToPass); // 花了幾次通關
        aSheet.getRange(playerRowIndex, 7).setValue(now); // 最近遊玩時間
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      score: finalScore,
      isPassed: isPassed
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
