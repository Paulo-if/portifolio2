import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social, gallery } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import FanCarousel from "@/components/FanCarousel/FanCarousel";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/portifolio2/images/og/home.jpg`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/portifolio2/images/og/home.jpg`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />


      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Schedule a call</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ),
                  )}
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
              </Column>
              <FanCarousel images={gallery.images.map(img => img.src)} title="Portfolio" />
            </>
          )}

          {about.work.display && (
            <>
              <Heading as="h1" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth className={styles.expCard}>
                    <Row fillWidth gap="32" s={{ direction: "column" }}>
                      <Column flex={5}>
                        <Column gap="4" marginBottom="m">
                          <Text id={experience.company} variant="heading-strong-l">
                            {experience.company}
                          </Text>
                          <Text variant="body-default-s" onBackground="brand-weak">
                            {experience.role}
                          </Text>
                          <Text variant="heading-default-xs" onBackground="neutral-weak">
                            {experience.timeframe}
                          </Text>
                        </Column>
                        <Column as="ul" gap="16">
                          {experience.achievements.map(
                            (achievement: React.ReactNode, index: number) => (
                              <Text
                                as="li"
                                variant="body-default-m"
                                key={`${experience.company}-${index}`}
                              >
                                {achievement}
                              </Text>
                            ),
                          )}
                        </Column>
                      </Column>
                      {experience.images && experience.images.length > 0 && (
                        <Column flex={4} fillHeight>
                          <div className={styles.imageWrapper}>
                            <Media
                              radius="m"
                              aspectRatio={`${experience.images[0].width} / ${experience.images[0].height}`}
                              alt={experience.images[0].alt}
                              src={experience.images[0].src}
                            />
                          </div>
                        </Column>
                      )}
                    </Row>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Row key={`${institution.name}-${index}`} fillWidth horizontal="between" vertical="center" gap="16">
                    <Column gap="4">
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {institution.description}
                      </Text>
                    </Column>
                    {institution.image && (
                      <Media
                        src={institution.image}
                        alt={institution.name}
                        width={6}
                        height={6}
                        radius="s"
                      />
                    )}
                  </Row>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h1"
                id={about.technical.title}
                variant="display-strong-s"
                marginTop="40"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Row fillWidth wrap gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column
                    key={`${skill.title}-${index}`}
                    fillWidth={skill.grid !== 2}
                    style={
                      skill.grid === 2
                        ? { flex: "1 1 calc(50% - var(--static-space-12))", minWidth: "240px" }
                        : {}
                    }
                    gap="4"
                  >
                    <Row fillWidth horizontal="between" vertical="center" gap="16">
                      <Column gap="4">
                        <Text id={skill.title} variant="heading-strong-l">
                          {skill.title}
                        </Text>
                        <Text variant="body-default-m" onBackground="neutral-weak">
                          {skill.description}
                        </Text>
                      </Column>
                      {skill.smallImage && (
                        <Media
                          src={skill.smallImage}
                          alt={skill.title}
                          width={6}
                          height={6}
                          radius="s"
                        />
                      )}
                    </Row>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Row>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}