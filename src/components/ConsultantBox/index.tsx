import classnames from "classnames";
import React from "react";
import "./styles.css";

interface ConsultantBoxProps {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingDuration?: number;
}

function ConsultantBoxRoot({
  className,
  children,
  isLoading,
  loadingDuration,
}: ConsultantBoxProps) {
    const style = {
    "--loading-duration": `${loadingDuration ? loadingDuration / 1000 : 6}s`,
  } as React.CSSProperties;
  
  return (
    <div
      className={classnames(
        "consultant-box",
        {
          "consultant-box--loading": isLoading,
        },
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function ConsultantBoxTitle({ children }: { children: React.ReactNode }) {
  return <div className="consultant-box__title">{children}</div>;
}

function ConsultantBoxDescription({ children }: { children: React.ReactNode }) {
  return <div className="consultant-box__description">{children}</div>;
}

export const ConsultantBox = Object.assign(ConsultantBoxRoot, {
  Title: ConsultantBoxTitle,
  Description: ConsultantBoxDescription,
});
