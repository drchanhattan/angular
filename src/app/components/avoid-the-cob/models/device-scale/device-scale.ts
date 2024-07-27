export const scale = () => {
  const baseWidth = 800;
  const baseHeight = 600;
  const devicePixelRatio = window.devicePixelRatio || 1;
  const widthScale = window.innerWidth / baseWidth;
  const heightScale = window.innerHeight / baseHeight;
  return Math.min(widthScale, heightScale) * devicePixelRatio;
};

export const scaledSize = (multiplier: number) => {
  return Math.round(scale() * multiplier);
};

export const scaledCount = (size: number, multiplier: number) => {
  return Math.round((size / scale() / window.devicePixelRatio) * multiplier);
};

export const scaledSpeed = (size: number, multiplier: number) => {
  return Math.round(size / scale()) * multiplier;
};
