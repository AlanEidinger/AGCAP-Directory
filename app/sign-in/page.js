import { redirect } from 'next/navigation';

// Old combined sign-in. Professionals and the admin each have their own login now.
export default function Page() {
  redirect('/account/login');
}
