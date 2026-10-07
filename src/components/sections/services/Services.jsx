import { services } from '../../../data/services';
import Reveal from '../../ui/Reveal';
import Section from '../../ui/Section';
import SectionHeading from '../../ui/SectionHeading';
import FreelanceCta from './FreelanceCta';
import ServiceCard from './ServiceCard';

export default function Services() {
  return (
    <Section id="services">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Freelance"
          title="Open for freelance work"
          description="I help startups and businesses launch reliable digital products. Here's how I can help you."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={index * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>

        <FreelanceCta />
      </div>
    </Section>
  );
}
