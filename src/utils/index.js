import { IMAGE_IS_NOT_AVAILABLE_URL } from "../constants";

export const getThumbnailProduct = (product) => {
  try {
    if (product && product.colors && product.colors.length > 0) {
      if (product.colors[0].images && product.colors[0].images.length > 0) {
        return product.colors[0].images[0].url;
      }
    }
  } catch (error) {}
  return IMAGE_IS_NOT_AVAILABLE_URL;
};
export const getThumbnailCartItem = (item) => {
  try {
    const image = item.detail.product.images.find(
      (el) => el.color_id === item.detail.color.id
    );
    if (image) {
      return image.url;
    }
  } catch (error) {}
  return IMAGE_IS_NOT_AVAILABLE_URL;
};
export const formatThousandDigits = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
