import classnames from "classnames";
import { useState, useEffect } from "react";
import { ConsultantBox } from "./components/ConsultantBox";
import { Header } from "./components/Header";
import { fourCMockData } from "./mockData/fourC";

import "./App.css";

function App() {
  const [showFourCKeywords, setShowFourCKeywords] = useState(false);
  const [expandContent, setExpandContent] = useState(false);

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

  // Start expansion first, before any boxes appear
  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setExpandContent(true);
    }, 2000); // Start expansion at the same time as original box timing

    return () => clearTimeout(expandTimer);
  }, []);

  // Start the first box after expansion completes
  useEffect(() => {
    if (expandContent) {
      const delayTimer = setTimeout(() => {
        setBoxStates((prev) => {
          const newStates = [...prev];
          newStates[0].isLoading = true;
          return newStates;
        });
      }, 800); // Wait for expansion animation to complete (0.8s)

      return () => clearTimeout(delayTimer);
    }
  }, [expandContent]);

  // Handle sequential loading of boxes
  useEffect(() => {
    boxStates.forEach((boxState, index) => {
      if (boxState.startLoadingBar && !boxState.isLoaded) {
        const loadingTime = fourCMockData[index].loadingTime;
        const completionTimer = setTimeout(() => {
          setBoxStates((prev) => {
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

  // After hideText completes, trigger the sliding and final keyword state
  useEffect(() => {
    const allBoxesCompleted = boxStates.every((state) => state.isCompleted);

    if (allBoxesCompleted && !showFourCKeywords) {
      const keywordTimer = setTimeout(() => {
        setShowFourCKeywords(true);
      }, 1000); // Wait for hideText animation to complete (1s)

      return () => clearTimeout(keywordTimer);
    }
  }, [boxStates, showFourCKeywords]);

  return (
    <div
      className={classnames("marketing-consultant-animation")}
    >
      <Header>Let's start by analyzing your business...</Header>
      <div className={classnames("content", {
        "expand-content": expandContent,
        "four-c-box-keywords": showFourCKeywords,
      })}>
        <div className="four-c-boxes">
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
                      <span className="title-text">Learning about your</span>{" "}
                      <b>{item.keyword}</b>
                      <span className="title-text">...</span>
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
      </div>
    </div>
  );
}

export default App;
