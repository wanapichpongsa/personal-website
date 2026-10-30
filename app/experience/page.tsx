import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio";

export const metadata: Metadata = { title: "Experience — Wana Pichpongsa" };

export default function ExperiencePage() {
  return <Portfolio initialKey="experience" />;
}
