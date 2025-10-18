import { useEffect } from 'react';
import { useDemoStore } from '../store/demoStore';

export const usePresenterMode = () => {
  const {
    isPresenterMode,
    togglePresenterMode,
    resetDemo,
    skipToResults,
    setPlaybackSpeed,
    playbackSpeed,
  } = useDemoStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Cmd+Shift+P or Ctrl+Shift+P to toggle presenter mode
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        togglePresenterMode();
        return;
      }

      // Only handle other shortcuts if presenter mode is active
      if (!isPresenterMode) return;

      switch (event.key) {
        case 'r':
        case 'R':
          event.preventDefault();
          resetDemo();
          break;

        case 's':
        case 'S':
          event.preventDefault();
          skipToResults();
          break;

        case '1':
          event.preventDefault();
          setPlaybackSpeed(1);
          break;

        case '2':
          event.preventDefault();
          setPlaybackSpeed(1.5);
          break;

        case '3':
          event.preventDefault();
          setPlaybackSpeed(2);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPresenterMode, togglePresenterMode, resetDemo, skipToResults, setPlaybackSpeed]);

  return {
    isPresenterMode,
    playbackSpeed,
  };
};
