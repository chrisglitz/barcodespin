'use client';

import { useEffect, useState, useCallback } from 'react';
import Wheel from '@/components/Wheel';
import ResultCard from '@/components/ResultCard';
import QuestionsDrawer from '@/components/QuestionsDrawer';
import SettingsBar from '@/components/SettingsBar';
import EditQuestionsModal from '@/components/EditQuestionsModal';
import { Question } from '@/lib/questions';
import {
  getQuestions,
  saveQuestions,
  getUsedQuestions,
  saveUsedQuestions,
  markQuestionAsUsed,
  getSettings,
  saveSettings,
  resetAll,
  addSpinResult,
} from '@/lib/storage';
import { selectRandomQuestion } from '@/lib/wheelMath';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [avoidRepeats, setAvoidRepeats] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [resultQuestion, setResultQuestion] = useState<Question | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    setQuestions(getQuestions());
    setUsedQuestions(getUsedQuestions());
    const settings = getSettings();
    setAvoidRepeats(settings.avoidRepeats);
    setMounted(true);
  }, []);

  // Save settings when they change
  useEffect(() => {
    if (mounted) {
      saveSettings({ avoidRepeats });
    }
  }, [avoidRepeats, mounted]);

  const handleSpin = useCallback(() => {
    if (isSpinning || questions.length === 0) return;

    // Convert used question IDs to indices
    const usedIndices = new Set<number>();
    questions.forEach((q, idx) => {
      if (usedQuestions.has(q.id)) {
        usedIndices.add(idx);
      }
    });

    // Select random question
    const selectedIndex = selectRandomQuestion(
      questions.length,
      usedIndices,
      avoidRepeats
    );

    setTargetIndex(selectedIndex);
    setIsSpinning(true);
    setResultQuestion(null);
  }, [isSpinning, questions, usedQuestions, avoidRepeats]);

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    if (targetIndex !== null && questions[targetIndex]) {
      const selectedQuestion = questions[targetIndex];
      setResultQuestion(selectedQuestion);
      addSpinResult(selectedQuestion.id);
    }
  }, [targetIndex, questions]);

  const handleMarkAsUsed = useCallback(() => {
    if (resultQuestion) {
      markQuestionAsUsed(resultQuestion.id);
      setUsedQuestions(getUsedQuestions());
    }
  }, [resultQuestion]);

  const handleResetUsed = useCallback(() => {
    resetAll();
    setUsedQuestions(new Set());
    setResultQuestion(null);
  }, []);

  const handleSpinAgain = useCallback(() => {
    setResultQuestion(null);
    // Small delay before allowing next spin
    setTimeout(() => {
      handleSpin();
    }, 100);
  }, [handleSpin]);

  const handleSaveQuestions = useCallback((newQuestionTexts: string[]) => {
    const newQuestions: Question[] = newQuestionTexts.map((text, index) => ({
      id: `q${String(index + 1).padStart(3, '0')}`,
      text,
    }));
    saveQuestions(newQuestions);
    setQuestions(newQuestions);
    setUsedQuestions(new Set());
    saveUsedQuestions(new Set());
    setShowEditModal(false);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (!resultQuestion && !isSpinning && !showQuestions && !showEditModal) {
          e.preventDefault();
          handleSpin();
        }
      }
      if (e.key === 'Escape') {
        if (showQuestions) setShowQuestions(false);
        if (showEditModal) setShowEditModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSpin, resultQuestion, isSpinning, showQuestions, showEditModal]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-cyber-gray/50 border-b border-cyber-light-gray/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo placeholder - user should replace with actual logo */}
            <div className="w-12 h-12 bg-cyber-orange/20 border-2 border-cyber-orange rounded flex items-center justify-center">
              <span className="text-cyber-orange font-bold text-xl">BS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wider">
              <span className="text-cyber-orange">BAR</span>
              <span className="text-cyber-blue">CODE</span>
              <span className="text-cyber-light-gray"> SPIN</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
          {/* Wheel */}
          <div className="w-full flex justify-center">
            <Wheel
              questions={questions}
              targetIndex={targetIndex}
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
            />
          </div>

          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`px-12 py-4 text-2xl font-bold rounded-lg transition-all ${
              isSpinning
                ? 'bg-cyber-gray text-cyber-light-gray/50 cursor-not-allowed'
                : 'bg-cyber-orange hover:bg-cyber-orange/80 text-black hover:shadow-neon-orange'
            }`}
          >
            {isSpinning ? 'SPINNING...' : 'SPIN'}
          </button>

          {/* Keyboard hint */}
          {!isSpinning && !resultQuestion && (
            <p className="text-cyber-light-gray/50 text-sm">
              Press SPACE or ENTER to spin
            </p>
          )}
        </div>
      </main>

      {/* Settings Bar */}
      <SettingsBar
        avoidRepeats={avoidRepeats}
        onToggleAvoidRepeats={() => setAvoidRepeats(!avoidRepeats)}
        onViewQuestions={() => setShowQuestions(true)}
        onResetAll={handleResetUsed}
        usedCount={usedQuestions.size}
        totalCount={questions.length}
      />

      {/* Result Modal */}
      {resultQuestion && (
        <ResultCard
          question={resultQuestion}
          onSpinAgain={handleSpinAgain}
          onMarkAsUsed={handleMarkAsUsed}
          onResetUsed={handleResetUsed}
          isUsed={usedQuestions.has(resultQuestion.id)}
        />
      )}

      {/* Questions Drawer */}
      {showQuestions && (
        <QuestionsDrawer
          questions={questions}
          usedQuestions={usedQuestions}
          onClose={() => setShowQuestions(false)}
          onEditQuestions={() => {
            setShowQuestions(false);
            setShowEditModal(true);
          }}
        />
      )}

      {/* Edit Questions Modal */}
      {showEditModal && (
        <EditQuestionsModal
          currentQuestions={questions.map((q) => q.text)}
          onSave={handleSaveQuestions}
          onCancel={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}
