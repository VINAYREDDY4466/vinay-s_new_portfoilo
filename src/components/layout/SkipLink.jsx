export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary-solid focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>
  );
}
