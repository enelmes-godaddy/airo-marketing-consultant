import { useState } from "react";
import { ConsultantBox } from "./components/ConsultantBox";
import { businessMockData } from "./mockData/business";

import "./App.css";

function App() {
  const [customersIsLoading, setCustomersIsLoading] = useState(true);
  const customersKeyword = "customers";

  return (
    <>
      <ConsultantBox
        className="box-customers"
        isLoading={customersIsLoading}
        loadingDuration={
          businessMockData.find((item) => item.keyword === customersKeyword)
            ?.loadingTime
        }
      >
        <ConsultantBox.Title>
          <>
            Learning about your <b>{customersKeyword}</b>...
          </>
        </ConsultantBox.Title>
        {customersIsLoading && (
          <ConsultantBox.Description>
            I'm digging into who your customers really are, so you can be the
            most competitive in the market.
          </ConsultantBox.Description>
        )}
      </ConsultantBox>
    </>
  );
}

export default App;
