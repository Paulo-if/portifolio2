"use client";

import { Column, Flex } from "@once-ui-system/core";
import { gallery } from "@/resources";
import FanCarousel from "../FanCarousel/FanCarousel";

export default function GalleryView() {
  const images = gallery.images.map(img => img.src);

  return (
    <Column fillWidth gap="24" horizontal="center" paddingTop="32">
      <Flex fillWidth direction="column">
        <FanCarousel images={images} title={gallery.title} />
      </Flex>
    </Column>
  );
}
