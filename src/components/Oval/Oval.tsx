import { Box, BoxProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface IOvalProps {
  children?: React.ReactNode;
  styles?: BoxProps;
  className?: string;
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  backgroundColor?: string;
  onClick?: () => void;
}

const OvalRef: React.ForwardRefRenderFunction<HTMLDivElement, IOvalProps> = (
  {
    children,
    justifyContent = "space-between",
    styles,
    className,
    backgroundColor,
    ...rest
  },
  ref
) => {
  return (
    <Box
      ref={ref}
      justifyContent={justifyContent}
      as="div"
      flexDir={"row"}
      className={className}
      alignItems="center"
      display="flex"
      padding="5px 25px"
      backgroundColor={backgroundColor ? backgroundColor : "#f4f6fa"}
      margin="5px"
      borderRadius="20px"
      {...styles}
      {...rest}
    >
      {children}
    </Box>
  );
};

export const Oval = forwardRef(OvalRef);
