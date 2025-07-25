import "./styles.css";

export function Header({ children }: { children: React.ReactNode }) {
  return <h1 className="test-header">{children}</h1>;
}
