import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience } from '../../../data/experience';
import Section from '../../ui/Section';
import SectionHeading from '../../ui/SectionHeading';
import TimelineItem from './TimelineItem';

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <Section id="experience">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="Where I've made an impact"
          description="Roles where I've owned features end-to-end, collaborated with great teams and delivered measurable results."
        />

        {experience.length > 0 && (
          <div ref={timelineRef} className="relative mt-16">
            <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-fg/10 md:left-[232px]">
              <motion.div
                style={{ scaleY: progress }}
                className="h-full w-full origin-top bg-gradient-to-b from-primary to-secondary"
              />
            </div>
            <ol className="space-y-12">
              {experience.map((item) => (
                <TimelineItem key={item.id ?? `${item.company}-${item.start}`} item={item} />
              ))}
            </ol>
          </div>
        )}
      </div>
    </Section>
  );
}
