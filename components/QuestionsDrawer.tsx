'use client';

import { Question } from '@/lib/questions';

interface QuestionsDrawerProps {
  questions: Question[];
  usedQuestions: Set<string>;
  onClose: () => void;
  onEditQuestions: () => void;
}

export default function QuestionsDrawer({
  questions,
  usedQuestions,
  onClose,
  onEditQuestions,
}: QuestionsDrawerProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-cyber-gray border-t-2 sm:border-2 border-cyber-blue w-full sm:max-w-3xl sm:max-h-[80vh] h-full sm:h-auto sm:rounded-lg shadow-neon-blue flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-cyber-blue">
          <h2 className="text-xl font-bold text-cyber-blue tracking-wider">
            ALL QUESTIONS ({questions.length})
          </h2>
          <button
            onClick={onClose}
            className="text-cyber-light-gray hover:text-cyber-orange text-2xl font-bold w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Actions */}
        <div className="p-4 border-b border-cyber-light-gray/20">
          <button
            onClick={onEditQuestions}
            className="px-4 py-2 bg-cyber-orange hover:bg-cyber-orange/80 text-black font-bold rounded-lg transition-all text-sm"
          >
            EDIT QUESTIONS
          </button>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {questions.map((question, index) => {
            const isUsed = usedQuestions.has(question.id);
            return (
              <div
                key={question.id}
                className={`p-3 rounded-lg border transition-all ${
                  isUsed
                    ? 'bg-cyber-blue/10 border-cyber-blue/30 opacity-60'
                    : 'bg-black/40 border-cyber-light-gray/20'
                }`}
              >
                <div className="flex gap-3">
                  <span className="text-cyber-orange font-bold flex-shrink-0">
                    {String(index + 1).padStart(3, '0')}.
                  </span>
                  <p className="text-cyber-light-gray text-sm flex-1">
                    {question.text}
                  </p>
                  {isUsed && (
                    <span className="text-cyber-blue text-xs font-bold flex-shrink-0">
                      USED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyber-light-gray/20 text-center">
          <p className="text-cyber-light-gray text-sm">
            {usedQuestions.size} of {questions.length} used
          </p>
        </div>
      </div>
    </div>
  );
}
