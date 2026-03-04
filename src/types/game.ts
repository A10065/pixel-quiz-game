/**
 * 遊戲相關型別定義
 */

export interface Question {
    id: number;
    text: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
}

export interface GameState {
    playerId: string;
    questions: Question[];
    currentQuestionIndex: number;
    answers: Record<number, string>; // { questionId: 'A' }
    score: number;
    isPassed: boolean;
    status: 'IDLE' | 'LOADING' | 'PLAYING' | 'FINISHED' | 'ERROR';
}

export interface SubmitResponse {
    success: boolean;
    score: number;
    isPassed: boolean;
    error?: string;
}

export interface FetchResponse {
    success: boolean;
    data: Question[];
    error?: string;
}
