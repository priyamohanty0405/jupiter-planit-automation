export class ConfigUtils {
  /** Get TEST_TAG from environment variables to filter tests by tag. */
  static getTestTag() {
    const tag = process.env.TEST_TAG?.trim();
    return tag
      ? { grep: new RegExp(tag, "i"), tag }
      : { grep: undefined, tag: undefined };
  }
}