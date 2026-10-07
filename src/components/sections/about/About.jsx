import { profile } from '../../../data/profile';
import Reveal from '../../ui/Reveal';
import Section from '../../ui/Section';
import SectionHeading from '../../ui/SectionHeading';
import BioCard from './BioCard';
import PortraitCard from './PortraitCard';
import StatsGrid from './StatsGrid';

export default function About() {
  const { title, titleHighlight } = profile.about;

  return (
    <Section id="about">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About me"
          title={
            <>
              {title} <span className="text-gradient">{titleHighlight}</span>
            </>
          }
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <PortraitCard className="h-full" />
          </Reveal>
          <div className="grid gap-4 lg:col-span-8">
            <Reveal delay={0.1}>
              <BioCard className="h-full" />
            </Reveal>
            <Reveal delay={0.2}>
              <StatsGrid />
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
