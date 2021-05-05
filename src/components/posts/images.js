import PropTypes from "prop-types";
export default function Image({ caption, imageSrc }) {
  return <img src={imageSrc} alt={caption} />;
}

Image.prototype = {
  caption: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};
