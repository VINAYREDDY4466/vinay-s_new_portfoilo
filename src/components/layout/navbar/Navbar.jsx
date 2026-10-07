import { useCallback, useEffect, useState } from 'react';
import { HOME_SECTION_ID, navLinks } from '../../../data/navigation';
import useActiveSection from '../../../hooks/useActiveSection';
import useLockBodyScroll from '../../../hooks/useLockBodyScroll';
import useMediaQuery from '../../../hooks/useMediaQuery';
import useScrolled from '../../../hooks/useScrolled';
import { ArrowUpRightIcon } from '../../../icons';
import { cn } from '../../../utils/cn';
import Button from '../../ui/Button';
import ThemeToggle from '../../ui/ThemeToggle';
import DesktopNav from './DesktopNav';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import MobileMenu from './MobileMenu';

const MOBILE_MENU_ID = 'mobile-menu';
const OBSERVED_SECTIONS = [HOME_SECTION_ID, ...navLinks.map((link) => link.id)];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrolled(24);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const activeId = useActiveSection(OBSERVED_SECTIONS);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useLockBodyScroll(isMenuOpen);

  useEffect(() => {
    if (isDesktop) closeMenu();
  }, [isDesktop, closeMenu]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleKeyDown = (event) => event.key === 'Escape' && closeMenu();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          isScrolled && !isMenuOpen ? 'border-fg/5 bg-bg/70 backdrop-blur-xl' : 'border-transparent',
        )}
      >
        <nav aria-label="Primary" className="container flex h-20 items-center justify-between">
          <Logo onClick={closeMenu} />
          <DesktopNav links={navLinks} activeId={activeId} />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:block">
              <Button href="#contact" icon={ArrowUpRightIcon} className="px-5 py-2.5">
                Hire me
              </Button>
            </div>
            <MenuToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen((open) => !open)} controlsId={MOBILE_MENU_ID} />
          </div>
        </nav>
      </header>
      <MobileMenu id={MOBILE_MENU_ID} isOpen={isMenuOpen} links={navLinks} activeId={activeId} onNavigate={closeMenu} />
    </>
  );
}
