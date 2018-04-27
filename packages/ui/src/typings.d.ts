declare module "react-loadable";
declare module "react-tappable";

interface Config {
  UI_TITLE: string;
  UI_HEADER: string;
}

interface Window {
  __env?: Config;
}
