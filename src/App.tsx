import { useState, useCallback } from 'react';
import './App.css';
import Login from './components/Login';
import QuizCard from './components/QuizCard';
import GameOver from './components/GameOver';
import type { GameState } from './types/game';
import { fetchQuestions, submitAnswers } from './api/client';
import { AnimatePresence, motion } from 'framer-motion';

import { usePreloadAvatars } from './hooks/usePreloadAvatars';

/**
 * Main App: 核心遊戲邏輯控中心
 * 處理首頁、答題中、讀取、與結算的狀態切換
 */

function App() {
  // 預載入關主圖像
  usePreloadAvatars();
  const [game, setGame] = useState<GameState>({
    playerId: "",
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    isPassed: false,
    status: 'IDLE'
  });

  const [error, setError] = useState<string | null>(null);

  // 登入處理：設置 ID 並抓取題目
  const handleLogin = useCallback(async (id: string) => {
    setGame(prev => ({ ...prev, status: 'LOADING', playerId: id }));
    setError(null);

    try {
      const data = await fetchQuestions();
      setGame(prev => ({
        ...prev,
        questions: data,
        status: 'PLAYING',
        currentQuestionIndex: 0,
        answers: {}
      }));
    } catch (err) {
      setGame(prev => ({ ...prev, status: 'IDLE' }));
      setError("連線失敗，請檢查後端 GAS 設定。");
      console.error(err);
    }
  }, []);

  // 選擇答案處理
  const handleSelect = useCallback((qId: number, option: string) => {
    setGame(prev => {
      const newAnswers = { ...prev.answers, [qId]: option };

      // 如果是最後一題
      if (prev.currentQuestionIndex === prev.questions.length - 1) {
        // 自動提交結算
        handleSubmit(newAnswers, prev.playerId);
        return {
          ...prev,
          answers: newAnswers,
          status: 'LOADING'
        };
      }

      // 下一題
      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  }, [game.questions, game.playerId]);

  // 提交問卷至 GAS 並獲取分數
  const handleSubmit = async (answers: Record<number, string>, playerId: string) => {
    try {
      const result = await submitAnswers(playerId, answers);
      setGame(prev => ({
        ...prev,
        score: result.score,
        isPassed: result.isPassed,
        status: 'FINISHED'
      }));
    } catch (err) {
      setGame(prev => ({ ...prev, status: 'ERROR' }));
      console.error(err);
    }
  };

  // 重置遊戲
  const handleReset = () => {
    setGame({
      playerId: "",
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      isPassed: false,
      status: 'IDLE'
    });
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <AnimatePresence mode="wait">

        {/* 首頁狀態 */}
        {game.status === 'IDLE' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Login
              onLogin={handleLogin}
              isLoading={false}
              error={error}
            />
          </motion.div>
        )}

        {/* 讀取狀態 */}
        {game.status === 'LOADING' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <p className="nes-text is-primary text-2xl mb-10">CONNECTING TO SERVER...</p>
            <progress className="nes-progress is-primary w-96 h-10" value="50" max="100"></progress>
            <div className="mt-10 animate-bounce">
              <i className="nes-mario"></i>
            </div>
          </motion.div>
        )}

        {/* 遊戲進行中狀態 */}
        {game.status === 'PLAYING' && game.questions.length > 0 && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl"
          >
            <QuizCard
              question={game.questions[game.currentQuestionIndex]}
              index={game.currentQuestionIndex}
              total={game.questions.length}
              onSelect={handleSelect}
              currentValue={game.answers[game.questions[game.currentQuestionIndex].id]}
            />
          </motion.div>
        )}

        {/* 遊戲結束狀態 */}
        {game.status === 'FINISHED' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <GameOver
              playerId={game.playerId}
              score={game.score}
              isPassed={game.isPassed}
              onReset={handleReset}
            />
          </motion.div>
        )}

        {/* 錯誤狀態 */}
        {game.status === 'ERROR' && (
          <motion.div
            key="error"
            className="nes-container is-dark is-rounded"
          >
            <p className="nes-text is-error">SOMETHING WENT WRONG!</p>
            <button onClick={handleReset} className="nes-btn is-warning mt-6">RETRY</button>
          </motion.div>
        )}

      </AnimatePresence>

      <footer className="mt-20 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] text-gray-400">© 2026 PIXEL QUEST | POWERED BY ANTIGRAVITY & GOOGLE SHEETS</p>
      </footer>
    </div>
  );
}

export default App;
