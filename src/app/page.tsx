import { redirect } from 'next/navigation';

export default function RootPage() {
  // In a real app, check auth status here
  // For now, always redirect to login
  redirect('/auth/login');
  return null; 
}
