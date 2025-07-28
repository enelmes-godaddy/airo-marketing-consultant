import "./styles.css";

export function Header({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h1 className={`test-header ${className}`}>{children}</h1>;
}
