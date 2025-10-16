import React from "react";
import ReactImageMagnify from "react-image-magnify";
import img from "../../assets/gold2.jpg";

const Demo = () => {
  return (
    <div className="w-[400px] mx-auto">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Gold Image",
            isFluidWidth: true,
            src: img, // ✅ Corrected
          },
          largeImage: {
            src: img, // ✅ Corrected
            width: 1200,
            height: 1800,
          },
          enlargedImageContainerDimensions: {
            width: "150%",
            height: "150%",
          },
        }}
      />
    </div>
  );
};

export default Demo;
