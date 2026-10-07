import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../../data/projects';
import { socials } from '../../../data/socials';
import { GithubIcon } from '../../../icons';
import { EASE_OUT_EXPO } from '../../../utils/motion';
import Button from '../../ui/Button';
import Section from '../../ui/Section';
import SectionHeading from '../../ui/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';

const ALL = 'All';
const githubUrl = socials.find((social) => social.id === 'github')?.url;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...new Set(projects.map((project) => project.category).filter(Boolean))],
    [],
  );

  const visibleProjects = useMemo(
    () => (activeCategory === ALL ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory],
  );

  return (
    <Section id="projects">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Projects I'm proud of"
          description="A selection of products I've designed, built and shipped — from idea to production."
        />
        <div className="mt-10">
          <ProjectFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </div>

        {visibleProjects.length ? (
          <motion.ul layout className="mt-14 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleProjects.map((project) => (
                <motion.li
                  key={project.id ?? project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <p className="mt-14 rounded-3xl border border-dashed border-fg/10 p-12 text-center text-muted">
            New projects are on the way — check back soon.
          </p>
        )}

        <div className="mt-14 flex justify-center">
          <Button href={githubUrl} variant="ghost" icon={GithubIcon}>
            More on GitHub
          </Button>
        </div>
      </div>
    </Section>
  );
}
