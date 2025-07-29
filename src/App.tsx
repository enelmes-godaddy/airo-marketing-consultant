import classnames from "classnames";
import { useState, useEffect } from "react";
import { ConsultantArrows } from "./components/ConsultantArrows";
import { ConsultantBox } from "./components/ConsultantBox";
import { ConsultantHeader } from "./components/ConsultantHeader";
import { centerBoxData } from "./data/centerBox";
import { fourCData } from "./data/fourC";
import { fourPData } from "./data/fourP";
import { useBoxSequence } from "./hooks/useBoxSequence";

import "./App.css";

// Configuration for each stage
const stageConfig = {
  1: {
    data: fourCData,
    headerText: "Let's start by analyzing your business...",
    direction: "left" as const,
  },
  2: {
    data: fourPData,
    headerText: "Next, I'll use the 4P approach to create your plan...",
    direction: "right" as const,
  },
  3: {
    data: centerBoxData,
    headerText: "Now, let's bring it all together...",
    direction: "center" as const,
  },
} as const;

function App() {
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);
  const [expandContent, setExpandContent] = useState(false);
  const [showStage1Keywords, setShowStage1Keywords] = useState(false);
  const [showStage2Keywords, setShowStage2Keywords] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [showCenterBox, setShowCenterBox] = useState(false);

  // Initialize box sequences for stages 1 and 2 only
  const stage1 = useBoxSequence(stageConfig[1].data, false);
  const stage2 = useBoxSequence(stageConfig[2].data, false);

  const currentStageConfig = stageConfig[currentStage];

  // Start content expansion before any boxes appear
  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setExpandContent(true);
    }, 2000);

    return () => clearTimeout(expandTimer);
  }, []);

  // Start stage 1 box sequence after content expansion completes
  useEffect(() => {
    if (expandContent && currentStage === 1) {
      stage1.startSequence();
    }
  }, [expandContent, currentStage, stage1]);

  // Handle stage 1 completion - trigger keyword sliding animation
  useEffect(() => {
    if (
      currentStage === 1 &&
      stage1.isSequenceComplete &&
      !showStage1Keywords
    ) {
      const keywordTimer = setTimeout(() => {
        setShowStage1Keywords(true);
      }, 600); // Wait for hideText animation to complete

      return () => clearTimeout(keywordTimer);
    }
  }, [currentStage, stage1.isSequenceComplete, showStage1Keywords]);

  // Handle stage 1 keyword completion - start stage 2
  useEffect(() => {
    if (currentStage === 1 && showStage1Keywords) {
      const stage2Timer = setTimeout(() => {
        setCurrentStage(2);
        stage2.startSequence();
      }, 2000); // Wait for stage 1 keyword sliding animation to complete

      return () => clearTimeout(stage2Timer);
    }
  }, [currentStage, showStage1Keywords, stage2]);

  // Handle stage 2 completion - trigger keyword sliding animation
  useEffect(() => {
    if (
      currentStage === 2 &&
      stage2.isSequenceComplete &&
      !showStage2Keywords
    ) {
      const keywordTimer = setTimeout(() => {
        setShowStage2Keywords(true);
      }, 600); // Wait for hideText animation to complete

      return () => clearTimeout(keywordTimer);
    }
  }, [currentStage, stage2.isSequenceComplete, showStage2Keywords]);

  // Handle stage 2 keyword completion - start stage 3
  useEffect(() => {
    if (currentStage === 2 && showStage2Keywords) {
      const stage3Timer = setTimeout(() => {
        setCurrentStage(3);
        setShowArrows(true);
      }, 2000); // Wait for stage 2 keyword sliding animation to complete

      return () => clearTimeout(stage3Timer);
    }
  }, [currentStage, showStage2Keywords]);

  // Handle stage 3 arrows completion - show center box
  useEffect(() => {
    if (currentStage === 3 && showArrows && !showCenterBox) {
      const centerBoxTimer = setTimeout(() => {
        setShowCenterBox(true);
      }, 600); // Delay before showing center box

      return () => clearTimeout(centerBoxTimer);
    }
  }, [currentStage, showArrows, showCenterBox]);

  return (
    <div className="marketing-consultant-animation">
      <ConsultantHeader
        key={currentStage}
        className={currentStage > 1 ? "fade-down" : ""}
      >
        {currentStageConfig.headerText}
      </ConsultantHeader>
      <div
        className={classnames("content", {
          "expand-content": expandContent,
          "four-c-box-keywords": showStage1Keywords,
          "four-p-box-keywords": showStage2Keywords,
          "center-box-visible": currentStage === 3,
          "show-arrows": showArrows,
          "show-center-box": showCenterBox,
        })}
      >
        {/* Stage 1 boxes */}
        {(currentStage === 1 || showStage1Keywords) && (
          <div
            className={classnames("keyword-boxes four-c-boxes", {
              "stage-complete": showStage1Keywords,
            })}
          >
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
                      {item.titleSuffix && (
                        <span className="title-text"> {item.titleSuffix}</span>
                      )}
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

        {/* Stage 3: Arrows and center box */}
        {currentStage === 3 && (
          <div className="stage-3-wrapper">
            {/* Arrows animation */}
            <ConsultantArrows
              className="arrows-container"
              isVisible={showArrows}
            />

            {/* Center box with fade-in */}
            {showCenterBox && (
              <div className={classnames("center-box", "fade-in")}>
                {stageConfig[3].data.map((item) => (
                  <ConsultantBox
                    key={item.id}
                    className="box-marketing-plan"
                    isLoading={false}
                    isLoaded={true}
                    isCompleted={false}
                    loadingDuration={0}
                  >
                    <ConsultantBox.Title>
                      <b>{item.keyword}</b>
                    </ConsultantBox.Title>
                  </ConsultantBox>
                ))}
              </div>
            )}

            {/* Arrows animation */}
            <ConsultantArrows
              className="arrows-container arrows-mirrored"
              isVisible={showArrows}
            />
          </div>
        )}

        {/* Stage 2 boxes */}
        {currentStage >= 2 && (
          <div
            className={classnames("keyword-boxes four-p-boxes", {
              "stage-complete": showStage2Keywords,
            })}
          >
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
                      {item.titleSuffix && (
                        <span className="title-text"> {item.titleSuffix}</span>
                      )}
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
