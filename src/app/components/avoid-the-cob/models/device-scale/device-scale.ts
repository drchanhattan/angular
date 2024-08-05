export const scale = () => {
  const widthScale = window.innerWidth / 800;
  const heightScale = window.innerHeight / 600;
  return Math.min(widthScale, heightScale);
};

export const scaledSize = (multiplier: number) => {
  return Math.round(scale() * multiplier);
};
