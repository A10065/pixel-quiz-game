# Pixel Quiz Game - 闖關問答遊戲

這是一個帶領玩家回到 2000 年代像素風格（Pixel Art）的線上闖關遊戲。

## 🎮 遊戲特色
- **像素復古風**: 使用 `NES.css` 與 DiceBear 打造豐富的關主角色與介面。
- **Google Sheets 驅動**: 題目與回答數據全部透過 Google Apps Script 同步，甚至可以將 Excel 當作你的簡易 CMS。
- **動態關主**: 每一關配有一個隨機 Pixel 風格的「關主」素材。

## 🐳 環境設定 (.env)
在專案根目錄建立 `.env` 檔案，並填入以下資訊：

```env
VITE_GOOGLE_APP_SCRIPT_URL=你的-GAS-WEB-APP-連結
VITE_PASS_THRESHOLD=60 (答對幾分算通過)
VITE_QUESTION_COUNT=10 (每次玩幾題)
```

## 🛠️ 開發與部署
1. 安裝套件: `npm install`
2. 本地開發: `npm run dev`
3. 建立成品: `npm run build`

## 🗃️ Google Sheets 結構
### 「題目」工作表
| 題號 | 題目 | A | B | C | D | 解答 |
|---|---|---|---|---|---|---|
| 1 | 這是題目嗎？ | 是 | 不是 | 可能 | 不告訴你 | A |

### 「回答」工作表
| ID | 闖關次數 | 總分 | 最高分 | 第一次通關分數 | 花了幾次通關 | 最近遊玩時間 |
|---|---|---|---|---|---|---|
| player_01 | 1 | 100 | 100 | 100 | 1 | 2024-03-04 |

## 👨‍💻 技術支持
本專案使用 React + Vite + TypeScript 開發。
由 Antigravity 機器人協助產出。
