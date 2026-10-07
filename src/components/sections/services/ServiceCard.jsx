import SpotlightCard from '../../ui/SpotlightCard';

export default function ServiceCard({ service }) {
  const { title, description, deliverables = [], icon: Icon } = service;

  return (
    <SpotlightCard className="group flex h-full flex-col p-7">
      {Icon && (
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl text-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon aria-hidden />
        </span>
      )}
      <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
      <p className="mb-6 mt-3 leading-relaxed text-muted">{description}</p>
      {deliverables.length > 0 && (
        <ul className="mt-auto space-y-2 border-t border-fg/10 pt-5">
          {deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2 font-mono text-xs uppercase tracking-wider text-fg/70">
              <span aria-hidden className="text-primary">+</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </SpotlightCard>
  );
}
