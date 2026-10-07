import { useMemo } from 'react';
import { skillGroups } from '../../../data/skills';
import { SparkleIcon } from '../../../icons';
import { cn } from '../../../utils/cn';
import Marquee from '../../ui/Marquee';
import Reveal from '../../ui/Reveal';
import Section from '../../ui/Section';
import SectionHeading from '../../ui/SectionHeading';
import SpotlightCard from '../../ui/SpotlightCard';
import { TagList } from '../../ui/Tag';

const createSkillRenderer = (textClass) =>
  function renderSkill(skill) {
    return (
      <span className={cn('flex items-center gap-4 whitespace-nowrap font-display text-3xl font-semibold md:text-5xl', textClass)}>
        {skill}
        <SparkleIcon aria-hidden className="h-6 w-6 text-primary md:h-8 md:w-8" />
      </span>
    );
  };

const renderSolidSkill = createSkillRenderer('text-fg/80');
const renderMutedSkill = createSkillRenderer('text-fg/25');

export default function Skills() {
  const allSkills = useMemo(() => skillGroups.flatMap((group) => group.skills), []);
  const middle = Math.ceil(allSkills.length / 2);

  return (
    <Section id="skills" className="overflow-hidden">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title="Technologies I build with"
          description="A modern, battle-tested stack for shipping products that are fast, secure and a joy to use."
        />
      </div>

      <div className="mt-16 space-y-6">
        <Marquee items={allSkills.slice(0, middle)} renderItem={renderSolidSkill} duration={45} />
        <Marquee items={allSkills.slice(middle)} renderItem={renderMutedSkill} duration={45} reverse />
      </div>

      <div className="container mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map(({ title, skills }, index) => (
          <Reveal key={title} delay={index * 0.08}>
            <SpotlightCard className="h-full p-6">
              <p className="font-mono text-xs text-muted">0{index + 1}</p>
              <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
              <TagList items={skills} className="mt-5" />
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
