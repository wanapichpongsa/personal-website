import { WelcomeOption } from "@/components/welcome-option";
import { profile } from "@/components/data";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-5 py-16 sm:px-6">
      <h1 className="animate-rise text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
        Welcome to {profile.name}&rsquo;s portfolio
      </h1>

      <p
        className="animate-rise mt-5 text-xl text-muted sm:text-2xl"
        style={{ animationDelay: "900ms" }}
      >
        What would you like to start with?
      </p>

      <div
        className="animate-rise mt-10 grid gap-3 sm:grid-cols-2"
        style={{ animationDelay: "1700ms" }}
      >
        <WelcomeOption
          href="/experience"
          label="Experience"
          hint="Where I've worked and what I've shipped."
        />
        <WelcomeOption
          href="/projects"
          label="Projects"
          hint="Things I've built on my own."
        />
      </div>
    </main>
  );
}
