"use client";

import type { ReactNode } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface TweetEmbedProps {
  tweetId: string;
  placeholder?: ReactNode;
}

export const TweetEmbed = ({ tweetId, placeholder }: TweetEmbedProps) => {
  return (
    <TwitterTweetEmbed
      tweetId={tweetId}
      options={{
        align: "center",
      }}
      placeholder={placeholder}
    />
  );
};
