import * as cookie from "js-cookie";

type Config = {
  UI_LOGO_FILENAME?: string;
  UI_HEADER: string;
  UI_TITLE: string;
  UI_IMPRINT_URL: string;
  UI_DISPLAY_NEEDED_GROUPS: string;
  UI_API_URL?: string;
};

let config: Config | null = null;

const CONFIG_COOKIE = "_config";

const readConfig = () => {
  const c = cookie.getJSON(CONFIG_COOKIE);

  config = c as Config;
};

export const get = () => {
  if (!config) {
    readConfig();
  }

  return config!;
};
