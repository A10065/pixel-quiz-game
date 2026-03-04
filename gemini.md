# Gemini 專案筆記 - Pixel Quiz Game

## 1. 核心需求回顧
- 打造 Pixel Art (2000s arcade) 風格的問答遊戲。
- 對接 Google Sheets (透過 GAS)。
- 使用 DiceBear 預載 100 張像素關主圖片。
- 登入需 ID，並記錄多次遊玩數據。

## 2. 實作重點
- 使用 `nes.css` 作為核心 UI 外套。
- 背景需要有懷舊感（可能加入格紋或漸層）。
- `DiceBear` 使用者圖像（Avatar）: `https://api.dicebear.com/8.x/pixel-art/svg?seed=...`
- 題目動態抽取並由 GAS 結算結果，以防止前端被竄改分數。

## 3. 專案檔案結構 (待實作)
- `src/api/gas.ts`: 對接 GAS Web App。
- `src/components/PixelAvatar.tsx`: 每一關的關主顯示。
- `src/components/Quiz.tsx`: 答題邏輯。
- `src/views/Home.tsx`: 登入頁。
- `src/views/GameOver.tsx`: 結算頁。

## 4. Google Apps Script 範例代碼 (提供給使用者)
隨後會將 GAS 代碼輸出至 `gas_project.gs` 文件。
