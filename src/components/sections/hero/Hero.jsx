import { motion } from 'framer-motion';
import { HOME_SECTION_ID } from '../../../data/navigation';
import { profile } from '../../../data/profile';
import { ArrowDownRightIcon, DownloadIcon } from '../../../icons';
import { fadeUp } from '../../../utils/motion';
import HeroVisual from '../../three/HeroVisual';
import AvailabilityBadge from '../../ui/AvailabilityBadge';
import Button from '../../ui/Button';
import LocalTime from '../../ui/LocalTime';
import SocialLinks from '../../ui/SocialLinks';
import HeroHeadline from './HeroHeadline';
import ScrollCue from './ScrollCue';

export default function Hero() {
  return (
    <section id={HOME_SECTION_ID} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div aria-hidden className="mask-radial absolute inset-0 -z-10 bg-grid" />
      <HeroVisual className="absolute inset-0 -z-10 opacity-40 md:left-auto md:w-[65%] md:opacity-100 lg:w-[55%]" />

      <div className="container">
        <motion.div {...fadeUp(0.1)}>
          <AvailabilityBadge />
        </motion.div>

        <HeroHeadline lines={profile.headline} />

        <motion.p {...fadeUp(0.6)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          {profile.tagline}
        </motion.p>

        <motion.div {...fadeUp(0.75)} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#projects" icon={ArrowDownRightIcon}>
            View my work
          </Button>
          <Button href={profile.resume} variant="ghost" icon={DownloadIcon} download>
            Download CV
          </Button>
        </motion.div>

        <motion.div {...fadeUp(0.9)} className="mt-14 flex flex-wrap items-center gap-6">
          <SocialLinks />
          <span aria-hidden className="hidden h-px w-10 bg-fg/15 sm:block" />
          <LocalTime location={profile.location} timeZone={profile.timeZone} />
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}
