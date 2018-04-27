declare module "react-loadable";
declare module "react-tappable";

interface Config {
  UI_TITLE: string;
  UI_HEADER: string;
  UI_DISPLAY_NEEDED_GROUPS: string;
}

interface Window {
  __env?: Config;
}
