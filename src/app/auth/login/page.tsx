
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
      <p className="mt-4 px-8 text-center text-xs text-muted-foreground">
        <strong>Demo:</strong> Use email <code className="font-semibold text-foreground">user@example.com</code> and password <code className="font-semibold text-foreground">password123</code> to log in.
      </p>
    </>
  );
}
