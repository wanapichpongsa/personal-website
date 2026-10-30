import { experience, profile, projects } from "./data";
import { ExperienceCard } from "./experience-card";
import { Header } from "./header";
import { ProjectList } from "./project-list";
import { TabCarousel } from "./tab-carousel";

export function Portfolio({ initialKey }: { initialKey: "experience" | "projects" }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <Header name={profile.name} tagline={profile.tagline} />

      <TabCarousel
        delay={80}
        initialKey={initialKey}
        tabs={[
          {
            key: "experience",
            label: "Experience",
            content: (
              <div className="space-y-3">
                {experience.map((item) => (
                  <ExperienceCard key={item.company} {...item} />
                ))}
              </div>
            ),
          },
          {
            key: "projects",
            label: "Projects",
            content: <ProjectList projects={projects} />,
          },
        ]}
      />
    </main>
  );
}
