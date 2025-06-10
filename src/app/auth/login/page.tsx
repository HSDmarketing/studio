import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In - RepliGo',
};

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-2 text-center font-headline text-2xl font-semibold tracking-tight text-foreground">
        Welcome back to RepliGo
      </h1>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Enter your credentials to access your account.
      </p>
      <LoginForm />
    </>
  );
}
