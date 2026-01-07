'use client';

interface SettingsBarProps {
  avoidRepeats: boolean;
  onToggleAvoidRepeats: () => void;
  onViewQuestions: () => void;
  onResetAll: () => void;
  usedCount: number;
  totalCount: number;
}

export default function SettingsBar({
  avoidRepeats,
  onToggleAvoidRepeats,
  onViewQuestions,
  onResetAll,
  usedCount,
  totalCount,
}: SettingsBarProps) {
  return (
    <div className="w-full bg-cyber-gray/50 border-t border-cyber-light-gray/20 p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-between">
        {/* Left: Stats */}
        <div className="text-cyber-light-gray text-sm">
          <span className="font-bold text-cyber-orange">{usedCount}</span> /{' '}
          {totalCount} used
        </div>

        {/* Center: Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Avoid Repeats Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={avoidRepeats}
              onChange={onToggleAvoidRepeats}
              className="w-4 h-4 accent-cyber-orange"
            />
            <span className="text-cyber-light-gray text-sm font-medium">
              Avoid Repeats
            </span>
          </label>

          {/* View Questions */}
          <button
            onClick={onViewQuestions}
            className="px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-white text-sm font-bold rounded transition-all"
          >
            VIEW ALL
          </button>

          {/* Reset All */}
          <button
            onClick={onResetAll}
            className="px-4 py-2 bg-cyber-gray hover:bg-cyber-gray/80 border border-cyber-light-gray text-cyber-light-gray text-sm font-bold rounded transition-all"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
