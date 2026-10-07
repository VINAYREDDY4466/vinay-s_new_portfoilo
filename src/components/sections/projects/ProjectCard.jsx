import SmartImage from '../../ui/SmartImage';
import SpotlightCard from '../../ui/SpotlightCard';
import Tag, { TagList } from '../../ui/Tag';
import ProjectLinks from './ProjectLinks';

export default function ProjectCard({ project }) {
  const { title, summary, image, category, year, featured, tech, links } = project;

  return (
    <SpotlightCard as="article" className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-fg/10">
        <SmartImage
          src={image}
          alt={`Screenshot of ${title}`}
          fallbackLabel={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {featured && <Tag variant="primary">Featured</Tag>}
          {category && <Tag>{category}</Tag>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold">{title}</h3>
          {year && <span className="font-mono text-xs text-muted">{year}</span>}
        </div>
        {summary && <p className="mt-3 leading-relaxed text-muted">{summary}</p>}
        <TagList items={tech} className="mt-6" />
        <ProjectLinks links={links} projectTitle={title} className="mt-auto pt-8" />
      </div>
    </SpotlightCard>
  );
}
