import { Box, styled } from "@mui/material";
import Image from "next/image";

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
}));

interface Props {
  image: string;
}

function DiaryImageList({ image }: Props) {
  return (
    <ImageWrapper>
      <Image
        src={image}
        alt="uploaded"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </ImageWrapper>
  );
}

export default DiaryImageList;

//! 추후 사진 2장 이상 가능해지면
// import { Box, styled } from "@mui/material";
// import Image from "next/image";

// const SquareImageWrapper = styled(Box)(({ theme }) => ({
//   width: 200,
//   height: 200,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   borderRadius: theme.shape.borderRadius,
//   overflow: "hidden",
//   marginTop: theme.spacing(2),
//   backgroundColor: "#fff", // 배경 흰색
// }));

// interface Props {
//   image: string;
// }

// function DiaryImageList({ image }: Props) {
//   return (
//     <SquareImageWrapper>
//       <Image
//         src={image}
//         alt="uploaded"
//         width={400}
//         height={400}
//         style={{ objectFit: "contain" }}
//         priority
//       />
//     </SquareImageWrapper>
//   );
// }

// export default DiaryImageList;
