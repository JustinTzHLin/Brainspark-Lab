import type {
  SkeletonProps as ChakraSkeletonProps,
  CircleProps,
} from "@chakra-ui/react";
import { Skeleton as ChakraSkeleton, Circle, Stack } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface SkeletonCircleProps extends ChakraSkeletonProps {
  size?: CircleProps["size"];
}

export const SkeletonCircle = (props: SkeletonCircleProps) => {
  const { size, ...rest } = props;
  return (
    <Circle size={size} asChild>
      <ChakraSkeleton {...rest} />
    </Circle>
  );
};

export interface SkeletonTextProps extends ChakraSkeletonProps {
  noOfLines?: number;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, children, ...rest } = props;
    console.log(rest);
    return (
      <Stack gap={gap} width="full" ref={ref}>
        {Array.from({ length: noOfLines }).map((_, index) => (
          <ChakraSkeleton
            height="4"
            key={index}
            // {...props} /* presonal edits */
            _last={{ maxW: "80%" }}
            {...rest}
            {...(index === 0 ? { children } : {})} /* presonal edits */
          />
        ))}
      </Stack>
    );
  },
);

export const Skeleton = ChakraSkeleton;
