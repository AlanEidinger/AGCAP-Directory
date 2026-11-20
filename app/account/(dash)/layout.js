import { redirect } from 'next/navigation';
import { currentPro } from '../../../lib/proauth';
import { proLogout } from '../actions';
import '../../styles/admin.css';

export const dynamic = 'force-dynamic';

export default async function DashLayout({ children }) {
  const me = await currentPro();
  if (!me) redirect('/account/login');
  return (
    <div className="app">
      <aside className="app-side">
        <a className="side-brand" href="/directory">
          <img src="/directory/agrifarm-emblem-reversed.png" alt="" />
          <span className="sb-lock"><span className="sb-eyebrow">Your listing</span><span className="sb-word">Directory</span></span>
        </a>
        <nav className="side-nav">
          <a className="side-link active" href="/directory/account">Edit profile</a>
          <a className="side-link" href="/directory/account#password">Password</a>
          {me.status === 'published' && <a className="side-link" href={`/directory/professionals/${me.slug}`} target="_blank" rel="noopener">View my page ↗</a>}
        </nav>
        <div className="side-foot">
          <div className="side-link" style={{ cursor: 'default' }}>{me.name}</div>
          <form action={proLogout}><button className="side-link adm-logout" type="submit">Sign out</button></form>
        </div>
      </aside>
      <div className="app-main">{children}</div>
    </div>
  );
}
