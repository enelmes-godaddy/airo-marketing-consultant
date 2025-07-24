import classnames from "classnames";
import React from "react";
import "./styles.css";

interface ConsultantBoxProps {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  isLoaded?: boolean;
  isCompleted?: boolean;
  loadingDuration?: number;
}

function ConsultantBoxRoot({
  className,
  children,
  isLoading,
  isLoaded,
  isCompleted,
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
          "consultant-box--loaded": isLoaded,
          "consultant-box--completed": isCompleted,
        },
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function ConsultantBoxTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={classnames("consultant-box__title", className)}>
      {children}
    </div>
  );
}

function ConsultantBoxDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={classnames("consultant-box__description", className)}>
      {children}
    </div>
  );
}

export const ConsultantBox = Object.assign(ConsultantBoxRoot, {
  Title: ConsultantBoxTitle,
  Description: ConsultantBoxDescription,
});
