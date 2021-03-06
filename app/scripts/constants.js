export const CLAP_LIMIT = 50;
export const CLAP_CONTAINER_SELECTOR = "js-actionMultirecommend";
export const CLAP_BUTTON_SELECTOR = "js-actionMultirecommendButton";
export const CLAP_UNDO_BUTTON_SELECTOR = "js-clapUndo";
export const CLAP_COMMENTS_SELECTOR = "js-actionMultirecommendButton";
export const CLAP_TYPE = {
  DISABLED: "disabled",
  LEFT: "post_share_widget",
  FOOTER: "post_actions_footer",
  BAR: "post_actions_bar"
};
export const CLAP_SOUND = {
  NORMAL: "clap",
  SUPER: "superClap"
};
export const CLAP_SYNC_SETTINGS = {
  sounds: true
};
export const CLAP_LOCAL_SETTINGS = {
  clap: null,
  superClap: null
};
export const CLAP_DEFAULT_SETTINGS = {
  ...CLAP_SYNC_SETTINGS,
  ...CLAP_LOCAL_SETTINGS
};
