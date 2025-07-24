import { useState, useEffect } from "react";
import { ConsultantBox } from "./components/ConsultantBox";
import { fourCMockData } from "./mockData/fourC";

import "./App.css";

function App() {
  // State for each box
  const [boxStates, setBoxStates] = useState(
    fourCMockData.map(() => ({
      isLoading: false,
      isLoaded: false,
      isCompleted: false,
      showDescription: false,
      startLoadingBar: false,
    }))
  );

  // Start the first box after 2 seconds
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setBoxStates(prev => {
        const newStates = [...prev];
        newStates[0].isLoading = true;
        return newStates;
      });
    }, 2000);

    return () => clearTimeout(delayTimer);
  }, []);

  // Handle sequential loading of boxes
  useEffect(() => {
    boxStates.forEach((boxState, index) => {
      if (boxState.startLoadingBar && !boxState.isLoaded) {
        const loadingTime = fourCMockData[index].loadingTime;
        const completionTimer = setTimeout(() => {
          setBoxStates(prev => {
            const newStates = [...prev];
            newStates[index].isLoaded = true;
            
            // Start the next box if it exists
            if (index + 1 < fourCMockData.length) {
              newStates[index + 1].isLoading = true;
            }
            
            return newStates;
          });
        }, loadingTime);

        return () => clearTimeout(completionTimer);
      }
    });
  }, [boxStates]);

  // Handle description fade-in with delay
  useEffect(() => {
    boxStates.forEach((boxState, index) => {
      if (boxState.isLoading && !boxState.showDescription) {
        const descriptionTimer = setTimeout(() => {
          setBoxStates(prev => {
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
          setBoxStates(prev => {
            const newStates = [...prev];
            newStates[index].startLoadingBar = true;
            return newStates;
          });
        }, 1000); // Wait for description reveal animation to complete (1s)

        return () => clearTimeout(loadingBarTimer);
      }
    });
  }, [boxStates]);

  return (
    <div className='four-c-boxes'>
      {fourCMockData.map((item, index) => {
        const boxState = boxStates[index];
        
        // Only render the box if it's loading or has been loaded
        // This ensures boxes only appear when it's their turn
        if (!boxState.isLoading && !boxState.isLoaded) {
          return null;
        }
        
        return (
          <ConsultantBox
            key={item.id}
            className={`box-${item.keyword}`}
            isLoading={boxState.startLoadingBar}
            isLoaded={boxState.isLoaded}
            isCompleted={boxState.isCompleted}
            loadingDuration={item.loadingTime}
          >
            <ConsultantBox.Title>
              <>
                <span className="title-text">Learning about your</span> <b>{item.keyword}</b><span className="title-text">...</span>
              </>
            </ConsultantBox.Title>
            {boxState.showDescription && (
              <ConsultantBox.Description className="reveal-text">
                {item.description}
              </ConsultantBox.Description>
            )}
          </ConsultantBox>
        );
      })}
    </div>
  );
}

export default App;
