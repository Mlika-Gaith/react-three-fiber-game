import React from "react";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

// Game Text
const StyledText = React.forwardRef(
  (
    {
      children,
      fontSize = 1,
      offset = 0.25,
      anchorX = "center",
      anchorY = "middle",
      textAlign = "justify",
      lineHeight = 0.75,
      ...props
    },
    ref
  ) => {
    const { viewport } = useThree();
    const textProps = {
      children,
      anchorX,
      anchorY,
      maxWidth: viewport.width,
      lineHeight,
      fontSize,
      textAlign,
      "material-depthTest": false,
    };
    return (
      <group ref={ref} {...props}>
        <Text position-z={-offset} color="#ff3080" {...textProps} />
        <Text color="white" {...textProps} />
      </group>
    );
  }
);
StyledText.displayName = "StyledText";

export default StyledText;
