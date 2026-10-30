import Link from "next/link";
import { Card } from "./card";
import type { Project } from "./data";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="space-y-3">
      {projects.map(({ name, description, href }) => (
        <li key={name}>
          <Link href={href} className="block rounded-3xl">
            <Card as="article" interactive>
              <h3 className="text-lg">{name}</h3>
              <p className="text-lg leading-snug text-muted">{description}</p>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
