export default function ScrollCue() {
  return (
    <a
      href="#about"
      aria-label="Scroll to about section"
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-fg md:flex [@media(max-height:880px)]:hidden"
    >
      Scroll
      <span className="relative h-12 w-px overflow-hidden bg-fg/10">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-primary" />
      </span>
    </a>
  );
}
