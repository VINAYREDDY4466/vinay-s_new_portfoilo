/** Pure-CSS globe shown while the 3D scene loads, or when WebGL is unavailable. */
export default function GlobeFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="relative aspect-square w-[min(55%,20rem)]">
        <div className="absolute -inset-[8%] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute inset-0 overflow-hidden rounded-full border border-primary/30 bg-[radial-gradient(circle_at_35%_30%,rgb(var(--c-surface)),rgb(var(--c-bg))_70%)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_11%,rgb(var(--c-primary)/0.25)_11%_calc(11%+1px))]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_11%,rgb(var(--c-primary)/0.25)_11%_calc(11%+1px))] [mask-image:radial-gradient(circle,#000_55%,transparent_72%)]" />
          <div className="absolute inset-0 rounded-full shadow-[inset_-1.5rem_-1rem_3rem_rgb(var(--c-primary)/0.35)]" />
        </div>
      </div>
    </div>
  );
}
