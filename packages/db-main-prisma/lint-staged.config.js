// @ts-check

/**
 * This files overrides the base lint-staged.config.js present in the root directory.
 * It allows to run eslint based the package specific requirements.
 * {@link https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo}
 * {@link https://github.com/City-of-Helsinki/events-helsinki-monorepo/blob/main/docs/about-lint-staged.md}
 */

const {
  concatFilesForPrettier,
  getEslintFixCmd,
} = require('../../lint-staged.common.js');

/**
 * @type {Record<string, (filenames: string[]) => string | string[] | Promise<string | string[]>>}
 */
const rules = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => {
    return getEslintFixCmd({
      cwd: __dirname,
      fix: true,
      cache: true,
      maxWarnings: 25,
      files: filenames,
    });
  },
  '**/*.{json,md,mdx,css,html,yml,yaml,scss}': (filenames) => {
    return [`prettier --write ${concatFilesForPrettier(filenames)}`];
  },
};

module.exports = rules;
