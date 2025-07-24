import { useState, useEffect } from "react";
import { ConsultantBox } from "./components/ConsultantBox";
import { businessMockData } from "./mockData/business";

import "./App.css";

function App() {
  const [customersIsLoading, setCustomersIsLoading] = useState(false);
  const [customersCompleted, setCustomersCompleted] = useState(false);
  const [hideCustomersText, setHideCustomersText] = useState(false);
  const customersKeyword = "customers";

  const loadingTime = businessMockData.find((item) => item.keyword === customersKeyword)?.loadingTime || 6000;

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setCustomersIsLoading(true);
    }, 2000);

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    if (customersIsLoading) {
      const completionTimer = setTimeout(() => {
        setCustomersCompleted(true);
      }, loadingTime);

      return () => clearTimeout(completionTimer);
    }
  }, [customersIsLoading, loadingTime]);

  // useEffect(() => {
  //   if (customersCompleted) {
  //     const hideTimer = setTimeout(() => {
  //       setHideCustomersText(true);
  //     }, 800);

  //     return () => clearTimeout(hideTimer);
  //   }
  // }, [customersCompleted]);

  return (
    <>
      <ConsultantBox
        className="box-customers"
        isLoading={customersIsLoading}
        isLoaded={customersCompleted}
        isCompleted={hideCustomersText}
        loadingDuration={
          businessMockData.find((item) => item.keyword === customersKeyword)
            ?.loadingTime
        }
      >
        <ConsultantBox.Title>
          <>
            <span className="title-text">Learning about your</span> <b>{customersKeyword}</b><span className="title-text">...</span>
          </>
        </ConsultantBox.Title>
        {customersIsLoading && (
          <ConsultantBox.Description className="reveal-text">
            I'm digging into who your customers really are, so you can be the
            most competitive in the market.
          </ConsultantBox.Description>
        )}
      </ConsultantBox>
    </>
  );
}

export default App;
