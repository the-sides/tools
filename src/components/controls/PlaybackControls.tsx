import React from 'react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  totalTime: number;
  playbackSpeed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onSeek: (time: number) => void;
  onReset: () => void;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  currentTime,
  totalTime,
  playbackSpeed,
  onPlayPause,
  onSpeedChange,
  onSeek,
  onReset,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / totalTime) * 100;

  const speeds = [0.5, 1, 2, 5, 10];

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-3 md:p-6">
      {/* Timeline */}
      <div className="mb-3 md:mb-6">
        <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-1 md:mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalTime)}</span>
        </div>

        {/* Progress bar */}
        <div
          className="relative w-full h-2 md:h-3 bg-gray-700 rounded-full cursor-pointer overflow-hidden group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            onSeek(percentage * totalTime);
          }}
        >
          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-200"
            style={{ width: `${progressPercentage}%` }}
          />

          {/* Hover indicator */}
          <div className="absolute inset-0 bg-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Playhead */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-orange-500 transition-all duration-200"
            style={{ left: `calc(${progressPercentage}% - 10px)` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {/* Left: Play/Pause and Reset */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onPlayPause}
            className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6 ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={onReset}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-all duration-200"
            title="Reset to beginning"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Center: Current status - hidden on mobile */}
        <div className="flex-1 text-center hidden md:block">
          <div className="text-sm text-gray-400">
            {isPlaying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Playing
              </span>
            ) : (
              'Paused'
            )}
          </div>
        </div>

        {/* Right: Speed control */}
        <div className="flex items-center gap-1 md:gap-2">
          <span className="text-xs md:text-sm text-gray-400 hidden md:inline">Speed:</span>
          <div className="flex gap-0.5 md:gap-1">
            {speeds.filter(s => s === 1 || s === 2 || s === 5).map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                className={`px-2 py-0.5 md:px-3 md:py-1 rounded text-xs md:text-sm font-medium transition-all duration-200 ${
                  playbackSpeed === speed
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;
