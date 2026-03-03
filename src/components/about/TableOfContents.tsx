"use client";

import React from "react";
import { Column, Flex, Row, Text } from "@once-ui-system/core";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <Row
      gap="24"
      vertical="center"
      horizontal="center"
      wrap
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <Flex
            key={sectionIndex}
            cursor="interactive"
            className={styles.hover}
            gap="8"
            vertical="center"
            onClick={() => scrollTo(section.title, 80)}
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              {section.title}
            </Text>
          </Flex>
        ))}
    </Row>
  );
};

export default TableOfContents;
