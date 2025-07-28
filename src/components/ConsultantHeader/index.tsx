import "./styles.css";

export function ConsultantHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h1 className={`consultant-header ${className}`}>{children}</h1>;
}
