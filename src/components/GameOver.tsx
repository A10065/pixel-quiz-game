import React from 'react';

/**
 * GameOver: 結算頁面
 * 顯示分數、是否通關、以及返回首頁
 */

interface GameOverProps {
    playerId: string;
    score: number;
    isPassed: boolean;
    onReset: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ playerId, score, isPassed, onReset }) => {
    return (
        <div className="nes-container with-title is-rounded is-centered shadow-2xl p-10 bg-white max-w-xl mx-auto border-8">
            <p className="title">GAME RESULT</p>

            <div className="flex flex-col items-center mb-10">
                <i className={`nes-icon is-large ${isPassed ? 'heart' : 'close'}`}></i>
                <h1 className={`text-4xl font-bold mb-4 ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
                    {isPassed ? "SUCCESS" : "FAILED"}
                </h1>
                <p className="text-gray-600 mb-8">PLAYER: {playerId}</p>
            </div>

            <div className="nes-container is-dark with-title mb-10">
                <p className="title text-lg">YOUR SCORE</p>
                <p className="text-7xl font-bold py-10 scale-125 transition-transform duration-500">
                    <span className={isPassed ? 'text-yellow-300' : 'text-gray-400'}>{score}</span>
                    <span className="text-2xl ml-2">pts</span>
                </p>
            </div>

            <div className="flex flex-col gap-6 w-full">
                {isPassed ? (
                    <div className="nes-balloon from-left is-success">
                        <p className="text-sm">恭喜通關！你的強大身手已經被記錄在 Google Sheets 了！</p>
                    </div>
                ) : (
                    <div className="nes-balloon from-right is-error">
                        <p className="text-sm">別氣餒！勇者只需要再一次磨練就能變強！</p>
                    </div>
                )}

                <button
                    onClick={onReset}
                    className="nes-btn is-primary mt-6 w-full py-4 text-xl"
                >
                    PLAY AGAIN
                </button>
            </div>

            <div className="mt-12 flex justify-center gap-6 opacity-60">
                <i className="nes-icon trophy is-large"></i>
                <i className="nes-icon coin is-large"></i>
                <i className="nes-icon star is-large"></i>
            </div>
        </div>
    );
};

export default GameOver;
