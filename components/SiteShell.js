import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

/**
 * Public-facing chrome: utility bar, nav, mega-menu, footer.
 * Dashboard routes (sign-in, account, admin) render their own shell
 * and deliberately do NOT use this.
 */
export default function SiteShell({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
