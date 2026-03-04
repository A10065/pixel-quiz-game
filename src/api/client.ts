import axios from 'axios';
import type { FetchResponse, Question, SubmitResponse } from '../types/game';

/**
 * 對接 Google Apps Script Web App
 */

const GAS_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;
const QUESTION_COUNT = import.meta.env.VITE_QUESTION_COUNT || 10;

// GAS Web App 呼叫常規: 
// GET 用於獲取題目資料
// POST 用於提交回答並計算分數

export const fetchQuestions = async (): Promise<Question[]> => {
    if (!GAS_URL) throw new Error('未設定 VITE_GOOGLE_APP_SCRIPT_URL');

    try {
        const response = await axios.get<FetchResponse>(GAS_URL, {
            params: {
                count: QUESTION_COUNT
            }
        });

        if (response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.error || '無法獲取題目');
        }
    } catch (error) {
        console.error('Fetch Questions Error:', error);
        throw error;
    }
};

export const submitAnswers = async (playerId: string, answers: Record<number, string>): Promise<SubmitResponse> => {
    if (!GAS_URL) throw new Error('未設定 VITE_GOOGLE_APP_SCRIPT_URL');

    try {
        const response = await axios.post<SubmitResponse>(GAS_URL, {
            playerId,
            answers
        }, {
            headers: {
                'Content-Type': 'text/plain' // 防止 CORS 問題: GAS 需設為 text/plain 並手動 JSON.parse
            }
        });

        return response.data;
    } catch (error) {
        console.error('Submit Answers Error:', error);
        throw error;
    }
};
