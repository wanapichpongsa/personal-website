import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { CreateDemo } from "./create-demo";

export const metadata: Metadata = {
  title: "parse — Wana Pichpongsa",
  description: "An ERP that codes itself",
};

const backstory = [
  {
    label: "Problem",
    text: "Business owners and division managers of small-medium enterprises (SMEs) requested me to build a bespoke enterprise planning resource (ERP) software for them. The obstacle to fulfilling that demand was that SMEs typically couldn't afford a software engineering team proportional to the quality of ERP they needed.",
  },
  {
    label: "Solution",
    text: "I reduced the minimum number of software engineers needed by building foundational code for an AI agent that can be prompted by managers to build features on its own (think of Lovable's logic but in an ERP setting). It then sends a GitHub pull request for engineers to review and approve.",
  },
  {
    label: "Limitations",
    text: "This is only reliable for repetitive features. I am seeking deeper understanding behind the empirical tracking of LLM performance before allowing the agent to invent features on its own.",
  },
];

export default function ParsePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <Link
        href="/"
        className="animate-rise inline-block px-5 text-muted transition-colors hover:text-foreground"
      >
        ← Back
      </Link>

      <header className="animate-rise mt-6 px-5">
        <h1 className="text-xl font-medium tracking-tight">parse</h1>
        <p className="mt-1 text-xl text-muted">An ERP that codes itself</p>
      </header>

      <Section title="Try it" delay={80}>
        <Card className="py-5">
          <CreateDemo />
        </Card>
      </Section>

      <Section title="Backstory" delay={120}>
        <Card as="dl" className="space-y-5">
          {backstory.map(({ label, text }) => (
            <div key={label}>
              <dt className="text-lg">{label}</dt>
              <dd className="text-lg leading-snug text-muted">{text}</dd>
            </div>
          ))}
        </Card>
      </Section>
    </main>
  );
}
