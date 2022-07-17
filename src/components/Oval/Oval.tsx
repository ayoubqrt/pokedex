import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";
import { OvalStyle } from "./Oval.css";

interface IOvalProps {
  children?: React.ReactNode;
  styles?: BoxProps;
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  onClick?: () => void;
}

export const Oval = React.forwardRef<HTMLDivElement, IOvalProps>(
  ({ children, justifyContent, styles, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        justifyContent={justifyContent}
        as="div"
        flexDir={"row"}
        className={OvalStyle}
        {...styles}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
