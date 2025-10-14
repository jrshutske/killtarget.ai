import { getClassIcon, getSpecIcon } from "@/utils/imageUtils";
import { Card, Group, Text, Stack, Image } from "@mantine/core";
import React from "react";

export interface SelectionCardProps {
  title: string;
  image?: React.ReactNode;
  buttons?: React.ReactNode;
}
export default function SelectionCard({
  image,
  title,
  buttons,
}: SelectionCardProps) {
  return (
    <Card withBorder shadow="sm" radius="sm" h={"100%"}>
      <Card.Section inheritPadding>
        <Group justify="left" gap="xs" pb="xs" pt="xs" wrap="nowrap">
          {image}
          <Text fw={1000} size="sm">
            {title}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding pb="sm">
        <Stack gap="xs">{buttons}</Stack>
      </Card.Section>
    </Card>
  );
}

export function ClassCardImage({ className }: { className: string }) {
  return <Image src={getClassIcon(className)} alt={className} w={30} h={30} />;
}

export function ClassCardSpecImage({
  className,
  spec,
}: {
  className: string;
  spec: string;
}) {
  return <Image src={getSpecIcon(className, spec)} alt={spec} w={20} h={20} />;
}
