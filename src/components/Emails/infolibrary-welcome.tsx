import * as React from "react";
import { siteConfig } from "@/config";
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
} from "@react-email/components";

interface InfoLibraryWelcomeProps {
  firstName: string;
}

export const InfoLibraryWelcome = ({
  firstName,
}: InfoLibraryWelcomeProps) => {
  const previewText = `Welcome ${firstName ?? "<FIRSTNAME>"}!`;

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
              <Text className="text-center text-gray-500">
                The Growing Platform for Free Information and Insightful
                Discussions
              </Text>
            </Section>
            {/* Welcome Talk */}
            <Section>
              <Text>
                Hey {firstName ?? "<FIRSTNAME>"} 👋, thank you for joining
                us!
              </Text>
              <Text>
                As a token of our appreciation, we would like to offer you
                the <strong>VIP Role</strong> in our Discord Community.
              </Text>

              <Text>
                This opportunity is available <strong>forever</strong>, and
                the{" "}
                <Link href={siteConfig.socialLinks[1].href}>
                  link is live here.
                </Link>
              </Text>
            </Section>
            <Hr />
            <Section>
              <Text className="leading-12 text-xs text-gray-400">
                This invitation was intended for{" "}
                <span className="text-black">
                  {firstName ?? "<FIRSTNAME>"}
                </span>
                . This email was sent from{" "}
                <span className="text-black">Info Library</span>.
              </Text>
              <Text className="leading-12 text-xs text-gray-400">
                If you have any questions or concerns, please{" "}
                <Link href={`mailto:${siteConfig.email}`}>
                  email us here.
                </Link>
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
  );
};

export default InfoLibraryWelcome;
