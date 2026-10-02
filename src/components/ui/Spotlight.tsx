/** Radial highlight that follows the pointer; parent must set --mx/--my (see useSpotlight) and `group`. */
export function Spotlight() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--accent-soft), transparent 60%)',
      }}
    />
  );
}
