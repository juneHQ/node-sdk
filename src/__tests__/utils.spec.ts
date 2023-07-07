import { enhanceContext, LIBRARY_NAME } from "../utilts";
import { version } from "../../package.json";

describe("enhanceContext", () => {
  it("should add library name and version", () => {
    // given
    const context = {};

    // when
    const newContext = enhanceContext(context);

    // then
    expect(newContext).toEqual({
      library: {
        name: LIBRARY_NAME,
        version,
      },
    });
  });

  it("should preserve the existing context and add library name and version", () => {
    // given
    const context = {
      groupId: "123",
      someOtherKey: "someOtherValue",
    };

    // when
    const newContext = enhanceContext(context);

    // then
    expect(newContext).toEqual({
      groupId: "123",
      someOtherKey: "someOtherValue",
      library: {
        name: LIBRARY_NAME,
        version,
      },
    });
  });

  it("should not override the library name and version provided by the SDK", () => {
    // given
    const context = {
      library: {
        name: "someOtherName",
        version: "someOtherVersion",
      },
    };

    // when
    const newContext = enhanceContext(context);

    // then
    expect(newContext).toEqual({
      library: {
        name: LIBRARY_NAME,
        version,
      },
    });
  });
});
