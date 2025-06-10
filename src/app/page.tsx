
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot, LogIn, UserPlus, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RepliGo - Automate Your Social Media Effortlessly',
  description: 'The smart way to manage comments, messages, and posts. Save time, engage your audience, and grow your brand with RepliGo.',
};

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-app-background to-secondary/30 p-6 text-center selection:bg-primary/20 selection:text-primary">
      <div className="max-w-3xl w-full">
        <header className="mb-12">
          <Bot className="h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-6 text-primary" />
        </header>

        <main className="space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-foreground !leading-tight">
            Automate Your Social Media <span className="text-primary">Effortlessly</span> with RepliGo
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
            The smart way to manage comments, messages, and posts. Save time, engage your audience, and grow your brand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:scale-105">
              <Link href="/auth/signup">
                <UserPlus className="mr-2 h-5 w-5" /> Get Started Free
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto shadow-md hover:shadow-accent/30 transition-all duration-300 ease-in-out transform hover:scale-105">
              <Link href="/auth/login">
                <LogIn className="mr-2 h-5 w-5" /> Log In
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground pt-4">
            No credit card required. Start automating in minutes!
          </p>
        </main>
      </div>
      
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} RepliGo. All rights reserved.
      </footer>
    </div>
  );
}
