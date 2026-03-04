# Pixel Quiz Game - 闖關問答遊戲 規格文件

## 1. 專案概述
一個結合 Pixel Art 像素風格與 Google Sheets 後端的闖關問答遊戲。

## 2. 技術選型
- **前端框架**: React (Vite + TypeScript)
- **UI 樣式**: NES.css (像素風), TailwindCSS, Framer Motion
- **圖片來源**: DiceBear API (Pixel Art 素材)
- **後端與資料庫**: Google Apps Script + Google Sheets

## 3. 架構圖
```mermaid
graph TD
    A[使用者] -->|輸入 ID| B[首頁]
    B -->|API Request| C[Google Apps Script]
    C -->|Fetch| D[Google Sheets - 題目]
    C -->|Response| B
    B -->|開始遊戲| E[遊戲介面]
    E -->|答題| F[成績計算]
    F -->|API Submit| C
    C -->|Record| G[Google Sheets - 回答]
    G -->|Summary| F
    F -->|顯示結果| H[結算頁面]
```

## 4. 資料模型 (ER 圖)
```mermaid
erDiagram
    QUESTIONS {
        int id "題號"
        string text "題目"
        string a "選項 A"
        string b "選項 B"
        string c "選項 C"
        string d "選項 D"
        string answer "正確答案 (隱藏)"
    }
    ANSWERS {
        string playerId "ID"
        int playCount "闖關次數"
        int totalScore "總分"
        int highScore "最高分"
        int firstPassScore "第一次通關分數"
        int passAttempts "花了幾次通關"
        datetime lastPlayed "最近遊玩時間"
    }
```

## 5. 環境變數 (.env)
- `VITE_GOOGLE_APP_SCRIPT_URL`: GAS Web App API URL
- `VITE_PASS_THRESHOLD`: 通過門檻 (e.g., 80)
- `VITE_QUESTION_COUNT`: 每次隨機抓取的題目量 (e.g., 10)

## 6. 重要流程 - 答題計算
1. 前端將答題清單傳送至 GAS。
2. GAS 比對 Google Sheets 中的正確答案。
3. 計算分數並更新「回答」工作表。
4. 回傳當次得分、最高分、與通關狀態給前端。
