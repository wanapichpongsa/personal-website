import { ExperienceCard } from "@/components/experience-card";
import { Header } from "@/components/header";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { experience, profile, projects } from "@/components/data";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <Header name={profile.name} tagline={profile.tagline} />

      <Section title="Experience" delay={80}>
        <div className="space-y-3">
          {experience.map((item) => (
            <ExperienceCard key={item.company} {...item} />
          ))}
        </div>
      </Section>

      <Section title="Projects" delay={160}>
        <ProjectList projects={projects} />
      </Section>
    </main>
  );
}
