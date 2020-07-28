export interface NavListSubmenuModel {
  name: string;
  icon: string;
  isOpened: boolean;
  links: Array<{ name: string, icon: string, link: string }>;
}
