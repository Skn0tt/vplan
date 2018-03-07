export let config = {
  baseUrl: ""
};

const createStore = (conf: typeof config) => (config = conf);

export default setup;
