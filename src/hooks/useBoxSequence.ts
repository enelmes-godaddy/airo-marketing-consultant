import { useState, useEffect } from 'react';

export interface BoxData {
  id: string;
  keyword: string;
  description: string;
  loadingTime: number;
}

export interface BoxState {
  isLoading: boolean;
  isLoaded: boolean;
  isCompleted: boolean;
  showDescription: boolean;
  startLoadingBar: boolean;
}

export interface UseBoxSequenceReturn {
  boxStates: BoxState[];
  isSequenceComplete: boolean;
  startSequence: () => void;
}

export function useBoxSequence(
  data: BoxData[],
  autoStart: boolean = false
): UseBoxSequenceReturn {
  const [boxStates, setBoxStates] = useState<BoxState[]>(
    data.map(() => ({
      isLoading: false,
      isLoaded: false,
      isCompleted: false,
      showDescription: false,
      startLoadingBar: false,
    }))
  );
  
  const [shouldStart, setShouldStart] = useState(autoStart);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);

  const startSequence = () => setShouldStart(true);

  // Start the first box
  useEffect(() => {
    if (shouldStart) {
      const delayTimer = setTimeout(() => {
        setBoxStates((prev) => {
          const newStates = [...prev];
          newStates[0].isLoading = true;
          return newStates;
        });
      }, 800); // Wait for expansion animation to complete (0.8s)

      return () => clearTimeout(delayTimer);
    }
  }, [shouldStart]);

  // Handle sequential loading of boxes
  useEffect(() => {
    boxStates.forEach((boxState, index) => {
      if (boxState.startLoadingBar && !boxState.isLoaded) {
        const loadingTime = data[index].loadingTime;
        const completionTimer = setTimeout(() => {
          setBoxStates((prev) => {
            const newStates = [...prev];
            newStates[index].isLoaded = true;

            // Start the next box if it exists
            if (index + 1 < data.length) {
              newStates[index + 1].isLoading = true;
            }

            return newStates;
          });
        }, loadingTime);

        return () => clearTimeout(completionTimer);
      }
    });
  }, [boxStates, data]);

  // Handle description fade-in with delay
  useEffect(() => {
    boxStates.forEach((boxState, index) => {
      if (boxState.isLoading && !boxState.showDescription) {
        const descriptionTimer = setTimeout(() => {
          setBoxStates((prev) => {
            const newStates = [...prev];
            newStates[index].showDescription = true;
            return newStates;
          });
        }, 800); // Short delay for description to fade in

        return () => clearTimeout(descriptionTimer);
      }
    });
  }, [boxStates]);

  // Start loading bar animation after description is fully revealed
  useEffect(() => {
    boxStates.forEach((boxState, index) => {
      if (boxState.showDescription && !boxState.startLoadingBar) {
        const loadingBarTimer = setTimeout(() => {
          setBoxStates((prev) => {
            const newStates = [...prev];
            newStates[index].startLoadingBar = true;
            return newStates;
          });
        }, 1000); // Wait for description reveal animation to complete (1s)

        return () => clearTimeout(loadingBarTimer);
      }
    });
  }, [boxStates]);

  // Set all boxes to completed state after all have loaded (triggers hideText)
  useEffect(() => {
    const allBoxesLoaded = boxStates.every((state) => state.isLoaded);
    const anyBoxCompleted = boxStates.some((state) => state.isCompleted);

    if (allBoxesLoaded && !anyBoxCompleted) {
      const completionTimer = setTimeout(() => {
        setBoxStates((prev) =>
          prev.map((state) => ({ ...state, isCompleted: true }))
        );
      }, 1500); // Short delay after all boxes are loaded

      return () => clearTimeout(completionTimer);
    }
  }, [boxStates]);

  // Check if sequence is complete
  useEffect(() => {
    const allBoxesCompleted = boxStates.every((state) => state.isCompleted);
    if (allBoxesCompleted && !isSequenceComplete) {
      setIsSequenceComplete(true);
    }
  }, [boxStates, isSequenceComplete]);

  return {
    boxStates,
    isSequenceComplete,
    startSequence,
  };
}
