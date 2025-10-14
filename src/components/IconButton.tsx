import { Button, Text, ActionIcon } from "@mantine/core";
import { IconMinus, IconX } from "@tabler/icons-react";

interface IconButtonProps {
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  onRightClick?: () => void;
  showRemoveButton?: boolean; // Shows X button on the right for removing
}

export default function IconButton({
  leftIcon,
  rightIcon,
  label,
  onClick,
  onRightClick,
}: IconButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="light"
      size="xs"
      fullWidth
      radius="sm"
      justify="flex-start"
      leftSection={leftIcon}
      rightSection={rightIcon}
      onContextMenu={(event) => {
        event.preventDefault();
        onRightClick?.();
      }}
    >
      <Text size="sm" fw={1000} ta="center">
        {label}
      </Text>
    </Button>
  );
}
