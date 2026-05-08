interface TitleImageProps {
  filename?: string;
  link?: string;
  alt: string;
}

const TitleImage = ({ filename, link, alt }: TitleImageProps) => {
  if (!filename) return null;
  const img = <img className="title-image" src={filename} alt={alt} />;
  return link
    ? <a href={link} target="_blank" rel="noreferrer">{img}</a>
    : img;
};

export default TitleImage;
