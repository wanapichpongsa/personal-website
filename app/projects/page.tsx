import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = { title: "Projects — Wana Pichpongsa" };

export default function ProjectsPage() {
  return <Portfolio initialKey="projects" />;
}
