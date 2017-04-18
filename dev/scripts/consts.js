// Copyright 2017 VS Networks LLC, All Rights Reserved.
// VS Networks CONFIDENTIAL

import path from "path";

export const SRC_DIR_PATH = path.resolve(__dirname, "../../src");

export const CONFIG_FILE_PATH = path.resolve(__dirname, "../../lynx-config.json");

export const DIST_DIR_PATH = path.resolve(__dirname, "../../dist");

export const DIST_APP_DIR_PATH = path.resolve(DIST_DIR_PATH, "app");

export const DIST_APP_FILE_NAME = "app.js";

export const DIST_APP_FILE_PATH = path.resolve(DIST_APP_DIR_PATH, DIST_APP_FILE_NAME);

export const DIST_APP_MIN_FILE_NAME = "app.min.js";

export const DIST_CONFIG_FILE_PATH = path.resolve(DIST_APP_DIR_PATH, "config.json");

export const STATIC_DIR_PATH = path.resolve(__dirname, SRC_DIR_PATH, "static");

export const SASS_DIR_PATH = path.resolve(__dirname, SRC_DIR_PATH, "stylesheets");

export const SASS_APP_FILE_NAME = "app.scss";

export const SASS_APP_FILE_PATH = path.resolve(SASS_DIR_PATH, SASS_APP_FILE_NAME);

export const SASS_OUT_DIR_NAME = "css";

export const SASS_OUT_DIR_PATH = path.resolve(DIST_APP_DIR_PATH, SASS_OUT_DIR_NAME);

export const SASS_OUT_FILE_NAME = "app.css";

export const SASS_OUT_FILE_PATH = path.resolve(DIST_APP_DIR_PATH, SASS_OUT_DIR_NAME, SASS_OUT_FILE_NAME);

export const SASS_OUT_MIN_FILE_NAME = "app.min.css";

export const SASS_OUT_MIN_FILE_PATH = path.resolve(DIST_APP_DIR_PATH, SASS_OUT_DIR_NAME, SASS_OUT_MIN_FILE_NAME);
