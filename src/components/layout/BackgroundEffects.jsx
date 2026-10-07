export default function BackgroundEffects() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] animate-aurora rounded-full bg-primary/15 blur-[140px] will-change-transform dark:bg-primary/20" />
        <div className="absolute -right-40 top-1/3 h-[34rem] w-[34rem] animate-aurora rounded-full bg-secondary/10 blur-[140px] will-change-transform [animation-delay:-9s]" />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] bg-noise opacity-[0.035] mix-blend-overlay" />
    </>
  );
}
