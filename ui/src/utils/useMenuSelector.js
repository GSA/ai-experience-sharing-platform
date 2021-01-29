import { useSelector } from "react-redux";

export default (key) => {
  const menus = useSelector((state) => state.site.menus);
  const menu = menus.find(({ slug }) => slug === key) || {};
  return menu;
};
