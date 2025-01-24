import type { Metadata } from "next"

import { staticMetadata } from "@/config/metadata"
import { ProjectCards } from "@/app/(Navigation)/projects/ProjectCards"

export const metadata: Metadata = {
  ...staticMetadata.projects,
}

export default function page() {
  return <ProjectCards />
}
