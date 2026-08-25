import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import AdminCMSApp from '@/components/admin/AdminCMSApp';

export const metadata = {
  title: 'Admin CMS — Harish R Portfolio',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminCMSApp
      initialUser={{
        username: session.username,
        mustChangePassword: session.mustChangePassword,
      }}
    />
  );
}
