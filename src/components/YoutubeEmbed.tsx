"use client"

import { YouTubeEmbed } from "@next/third-parties/google"

// Reference: https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#youtube-embed
interface YoutubeEmbedProps {
  videoid: string
  params?: string
}

export const YoutubeEmbed = ({ videoid, params }: YoutubeEmbedProps) => {
  return <YouTubeEmbed videoid={videoid} params={params} />
}
