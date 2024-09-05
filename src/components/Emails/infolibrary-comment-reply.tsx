import * as React from "react"
import { siteConfig } from "@/config"
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface InfoLibraryWelcomeProps {
  body: string
  commentLink: string
  senderName: string
}

export const InfoLibraryCommentReply = ({
  body,
  commentLink,
  senderName,
}: InfoLibraryWelcomeProps) => {
  const previewText = `Reply from ${senderName}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-16 max-w-xl rounded border border-solid border-gray-300 p-6">
            {/* Image */}
            <Section className="mt-24">
              <Img
                src={`${siteConfig.url}/images/info-library.png`}
                width="80"
                height="80"
                alt="Info Library"
                className="mx-auto my-0 rounded"
              />
            </Section>
            {/* Title/Slogan */}
            <Section>
              <Link href={siteConfig.url} className="text-black">
                <Heading className="text-center font-extrabold">
                  Info <span className="text-green-500">Library</span>
                </Heading>
              </Link>
            </Section>

            <Section>
              <Text>
                Your comment has been replied to by{" "}
                <strong>{senderName ?? "<SENDER-NAME>"}!</strong>
              </Text>
              <Heading className="text-2xl">Reply Text</Heading>
              <Text className="rounded bg-gray-300 p-4 font-mono italic">
                {`"${body}"`}
              </Text>
              <Text className="pt-4">
                <Link href={commentLink} className="font-bold underline">
                  Follow this link
                </Link>{" "}
                to reply back!
              </Text>
            </Section>
            <Hr />
            <Section>
              <Text className="leading-12 text-xs text-gray-400">
                If you have any questions or concerns, please{" "}
                <Link href={`mailto:${siteConfig.email}`}>email us here.</Link>
              </Text>
              {/* <Text className="leading-12 text-xs text-gray-400">
                <Link href={`${siteConfig.blogUrl}/unsubscribe`}>
                  unsubscribe
                </Link>
              </Text> */}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default InfoLibraryCommentReply
