export const getTransform = (random) => {
  let transform = "";
  switch (random) {
    case 1:
      transform = "rotateX(0deg) rotateY(0deg)";
      break;

    case 6:
      transform = "rotateX(180deg) rotateY(0deg)";
      break;

    case 2:
      transform = "rotateX(-90deg) rotateY(0deg)";
      break;

    case 5:
      transform = "rotateX(90deg) rotateY(0deg)";
      break;

    case 3:
      transform = "rotateX(0deg) rotateY(90deg)";
      break;

    case 4:
      transform = "rotateX(0deg) rotateY(-90deg)";
      break;
    default:
      break;
  }
  return transform;
};
