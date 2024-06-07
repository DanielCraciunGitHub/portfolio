export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-05"

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET ||
  process.env.SANITY_STUDIO_DATASET

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID || 
  "q5ejsh28"

export const useCdn = false
