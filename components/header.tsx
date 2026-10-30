export function Header({ name, tagline }: { name: string; tagline: string }) {
  return (
    <header className="animate-rise px-5">
      <h1 className="text-xl font-medium tracking-tight">{name}</h1>
      <p className="mt-1 text-xl text-muted">{tagline}</p>
    </header>
  );
}
