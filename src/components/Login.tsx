import React, { useState } from 'react';

/**
 * Login: 玩家登入介面
 * 需要輸入使用者 ID 才能開始存取 GAS 題目
 */

interface LoginProps {
    onLogin: (id: string) => void;
    isLoading: boolean;
    error: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading, error }) => {
    const [id, setId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id.trim()) {
            onLogin(id.trim());
        }
    };

    return (
        <div className="nes-container with-title is-rounded is-centered login-card max-w-lg mx-auto p-10 bg-white shadow-2xl">
            <p className="title">RETRO QUIZ ADVENTURE</p>

            <div className="flex flex-col items-center mb-10">
                <i className="nes-jp-logo is-large mb-6 scale-150"></i>
                <h1 className="text-2xl font-bold mb-4">闖關問答</h1>
                <p className="text-gray-500 text-sm">請輸入你的 PLAYER ID 以記錄冒險歷程</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="nes-field">
                    <label htmlFor="player_id">PLAYER ID</label>
                    <input
                        type="text"
                        id="player_id"
                        className={`nes-input ${error ? 'is-error' : 'is-success'}`}
                        placeholder="例如: PLAYER_01"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                {error && <p className="nes-text is-error text-sm">{error}</p>}

                <button
                    type="submit"
                    className={`nes-btn is-primary mt-6 ${isLoading ? 'is-disabled' : ''}`}
                    disabled={isLoading || !id.trim()}
                >
                    {isLoading ? "LOADING..." : "START GAME"}
                </button>
            </form>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center gap-4 grayscale opacity-50">
                <i className="nes-octocat animate-pulse"></i>
                <i className="nes-smartphone"></i>
                <span className="text-[10px] mt-2">v. 1.0.0 PIXEL EDITION</span>
            </div>
        </div>
    );
};

export default Login;
