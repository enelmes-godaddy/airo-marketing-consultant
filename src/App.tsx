import classnames from "classnames";
import { useState, useEffect } from "react";
import { ConsultantBox } from "./components/ConsultantBox";
import { Header } from "./components/Header";
import { fourCMockData } from "./mockData/fourC";
import { fourPMockData } from "./mockData/fourP";
import { useBoxSequence } from "./hooks/useBoxSequence";

import "./App.css";

// Configuration for each stage
const stageConfig = {
  1: {
    data: fourCMockData,
    headerText: "Let's start by analyzing your business...",
    direction: 'left' as const,
  },
  2: {
    data: fourPMockData,
    headerText: "Next, I'll use the 4P approach to create your plan...",
    direction: 'right' as const,
  },
} as const;

function App() {
  const [currentStage, setCurrentStage] = useState<1 | 2>(1);
  const [expandContent, setExpandContent] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);

  // Initialize box sequences for both stages
  const stage1 = useBoxSequence(stageConfig[1].data, false);
  const stage2 = useBoxSequence(stageConfig[2].data, false);

  const currentStageConfig = stageConfig[currentStage];

  // Start expansion first, before any boxes appear
  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setExpandContent(true);
    }, 2000);

    return () => clearTimeout(expandTimer);
  }, []);

  // Start the first stage sequence after expansion completes
  useEffect(() => {
    if (expandContent && currentStage === 1) {
      stage1.startSequence();
    }
  }, [expandContent, currentStage, stage1]);

  // Handle stage 1 completion - trigger sliding to keywords
  useEffect(() => {
    if (currentStage === 1 && stage1.isSequenceComplete && !showKeywords) {
      const keywordTimer = setTimeout(() => {
        setShowKeywords(true);
      }, 1000); // Wait for hideText animation to complete

      return () => clearTimeout(keywordTimer);
    }
  }, [currentStage, stage1.isSequenceComplete, showKeywords]);

  // Handle stage 1 keywords completion - start stage 2
  useEffect(() => {
    if (currentStage === 1 && showKeywords) {
      const stage2Timer = setTimeout(() => {
        setCurrentStage(2);
        stage2.startSequence();
      }, 2000); // Wait for stage 1 sliding animation to complete

      return () => clearTimeout(stage2Timer);
    }
  }, [currentStage, showKeywords, stage2]);

  return (
    <div className="marketing-consultant-animation">
      <Header className={currentStage === 2 ? "fade-down" : ""}>{currentStageConfig.headerText}</Header>
      <div
        className={classnames("content", {
          "expand-content": expandContent,
          "four-c-box-keywords": showKeywords,
          "four-p-box-keywords": currentStage === 2 && stage2.isSequenceComplete,
        })}
      >
        {/* Stage 1 boxes */}
        {(currentStage === 1 || showKeywords) && (
          <div className={classnames("four-c-boxes", {
            "stage-complete": showKeywords
          })}>
            {stageConfig[1].data.map((item, index) => {
              const boxState = stage1.boxStates[index];

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
                      <span className="title-text">{item.titlePrefix}</span>{" "}
                      <b>{item.keyword}</b>
                      {item.titleSuffix && <span className="title-text"> {item.titleSuffix}</span>}
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
        )}

        {/* Stage 2 boxes */}
        {currentStage === 2 && (
          <div className={classnames("four-p-boxes", {
            "stage-complete": stage2.isSequenceComplete
          })}>
            {stageConfig[2].data.map((item, index) => {
              const boxState = stage2.boxStates[index];

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
                      <span className="title-text">{item.titlePrefix}</span>{" "}
                      <b>{item.keyword}</b>
                      {item.titleSuffix && <span className="title-text"> {item.titleSuffix}</span>}
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
        )}
      </div>
    </div>
  );
}

export default App;
