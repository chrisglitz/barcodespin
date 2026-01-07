'use client';

import { useState } from 'react';

interface EditQuestionsModalProps {
  currentQuestions: string[];
  onSave: (newQuestions: string[]) => void;
  onCancel: () => void;
}

export default function EditQuestionsModal({
  currentQuestions,
  onSave,
  onCancel,
}: EditQuestionsModalProps) {
  const [textValue, setTextValue] = useState(currentQuestions.join('\n'));
  const [warning, setWarning] = useState('');

  const handleSave = () => {
    const lines = textValue
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      setWarning('Please enter at least one question');
      return;
    }

    if (lines.length !== 100) {
      setWarning(
        `You have ${lines.length} questions. The wheel works best with 100, but you can continue.`
      );
    } else {
      setWarning('');
    }

    onSave(lines);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-cyber-gray border-2 border-cyber-orange max-w-4xl w-full rounded-lg shadow-neon-orange max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-2 border-cyber-orange">
          <h2 className="text-xl font-bold text-cyber-orange tracking-wider">
            EDIT QUESTIONS
          </h2>
          <p className="text-cyber-light-gray text-sm mt-2">
            Enter one question per line. Recommended: 100 questions.
          </p>
        </div>

        {/* Textarea */}
        <div className="flex-1 p-4 overflow-hidden">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className="w-full h-full bg-black/40 text-cyber-light-gray border border-cyber-light-gray/20 rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:border-cyber-blue"
            placeholder="Enter questions here, one per line..."
          />
        </div>

        {/* Warning */}
        {warning && (
          <div className="px-4 py-2 bg-cyber-blue/20 border-t border-cyber-blue">
            <p className="text-cyber-blue text-sm">{warning}</p>
          </div>
        )}

        {/* Actions */}
        <div className="p-4 border-t border-cyber-light-gray/20 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-cyber-gray hover:bg-cyber-gray/80 border border-cyber-light-gray text-cyber-light-gray font-bold rounded-lg transition-all"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-cyber-orange hover:bg-cyber-orange/80 text-black font-bold rounded-lg transition-all hover:shadow-neon-orange"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
