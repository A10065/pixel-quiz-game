import React from 'react';
import type { Question } from '../types/game';
import PixelBoss from './PixelBoss';

/**
 * QuizCard: 答題卡片組件
 * 包含關主頭像、題目、選項
 */

interface QuizCardProps {
    question: Question;
    index: number;
    total: number;
    onSelect: (qId: number, option: string) => void;
    currentValue?: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, index, total, onSelect, currentValue }) => {
    return (
        <div className="nes-container with-title is-rounded is-centered mb-10 pixel-card">
            <p className="title">LEVEL {index + 1} / {total}</p>

            <PixelBoss index={index} className="mb-6" />

            <div className="nes-container is-dark with-title mb-6">
                <p className="title">QUESTION</p>
                <p className="text-xl px-4 py-2">{question.text}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {Object.entries(question.options).map(([key, value]) => (
                    <button
                        key={key}
                        type="button"
                        className={`nes-btn w-full text-left ${currentValue === key ? 'is-success' : ''}`}
                        onClick={() => onSelect(question.id, key)}
                    >
                        <span className="mr-2">{key}.</span> {value}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizCard;
