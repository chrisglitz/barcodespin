'use client';

import { Question } from '@/lib/questions';

interface ResultCardProps {
  question: Question;
  onSpinAgain: () => void;
  onMarkAsUsed: () => void;
  onResetUsed: () => void;
  isUsed: boolean;
}

export default function ResultCard({
  question,
  onSpinAgain,
  onMarkAsUsed,
  onResetUsed,
  isUsed,
}: ResultCardProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-gray border-2 border-cyber-orange max-w-2xl w-full rounded-lg shadow-neon-orange">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center border-b-2 border-cyber-blue pb-4">
            <h2 className="text-2xl font-bold text-cyber-orange tracking-wider">
              RESULT
            </h2>
          </div>

          {/* Question */}
          <div className="bg-black/40 p-6 rounded-lg border border-cyber-light-gray/20">
            <p className="text-cyber-light-gray text-xl text-center leading-relaxed">
              {question.text}
            </p>
          </div>

          {/* Status Badge */}
          {isUsed && (
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-cyber-blue/20 border border-cyber-blue text-cyber-blue text-sm font-bold rounded">
                ALREADY USED
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={onSpinAgain}
              className="px-6 py-3 bg-cyber-orange hover:bg-cyber-orange/80 text-black font-bold rounded-lg transition-all hover:shadow-neon-orange"
            >
              SPIN AGAIN
            </button>

            {!isUsed && (
              <button
                onClick={onMarkAsUsed}
                className="px-6 py-3 bg-cyber-blue hover:bg-cyber-blue/80 text-white font-bold rounded-lg transition-all hover:shadow-neon-blue"
              >
                MARK AS USED
              </button>
            )}

            <button
              onClick={onResetUsed}
              className="px-6 py-3 bg-cyber-gray hover:bg-cyber-gray/80 border border-cyber-light-gray text-cyber-light-gray font-bold rounded-lg transition-all"
            >
              RESET ALL USED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
