import AnalyticsNode from "analytics-node";
import {
  AnalyticsOptions,
  BaseAnalyticsOptions,
  Identity,
  AnyObject,
  Integrations,
  Data,
} from "./types";
import { enhanceContext } from "./utilts";

export class Analytics {
  private readonly nodeAnalytics: AnalyticsNode;

  constructor(writeKey: string, opts?: AnalyticsOptions) {
    const options = opts ?? {};
    const mergedOptions: BaseAnalyticsOptions = {
      ...options,
      host: "https://api.june.so",
      path: "/sdk/batch",
    };

    this.nodeAnalytics = new AnalyticsNode(writeKey, mergedOptions);
  }

  identify(
    message: Identity & {
      traits?: AnyObject;
      timestamp?: Date;
      context?: AnyObject;
      integrations?: Integrations;
    },
    callback?: (err: Error) => void
  ): Analytics {
    const newContext = enhanceContext(message.context ?? {});
    const newMessage = {
      ...message,
      context: newContext,
    };
    this.nodeAnalytics.identify(newMessage, callback);
    return this;
  }

  track(
    message: Identity & {
      event: string;
      properties?: AnyObject;
      timestamp?: Date;
      context?: AnyObject;
      integrations?: Integrations;
    },
    callback?: (err: Error) => void
  ): Analytics {
    const newContext = enhanceContext(message.context ?? {});
    const newMessage = {
      ...message,
      context: newContext,
    };
    this.nodeAnalytics.track(newMessage, callback);
    return this;
  }

  page(
    message: Identity & {
      category?: string;
      name?: string;
      properties?: AnyObject;
      timestamp?: Date;
      context?: AnyObject;
      integrations?: Integrations;
      messageId?: string;
    },
    callback?: (err: Error) => void
  ): Analytics {
    const newContext = enhanceContext(message.context ?? {});
    const newMessage = {
      ...message,
      context: newContext,
    };
    this.nodeAnalytics.page(newMessage, callback);
    return this;
  }

  screen(
    message: Identity & {
      name?: string;
      properties?: AnyObject;
      timestamp?: Date;
      context?: AnyObject;
      integrations?: Integrations;
    },
    callback?: (err: Error) => void
  ): Analytics {
    const newContext = enhanceContext(message.context ?? {});
    const newMessage = {
      ...message,
      context: newContext,
    };
    this.nodeAnalytics.screen(newMessage, callback);
    return this;
  }

  alias(
    message: Identity & {
      previousId: string | number;
      integrations?: Integrations;
    },
    callback?: (err: Error) => void
  ): Analytics {
    const newContext = enhanceContext({});
    const newMessage = {
      ...message,
      context: newContext,
    };
    this.nodeAnalytics.alias(newMessage, callback);
    return this;
  }

  group(
    message: Identity & {
      groupId: string | number;
      traits?: AnyObject;
      context?: AnyObject;
      timestamp?: Date;
      integrations?: Integrations;
    },
    callback?: (err: Error) => void
  ): Analytics {
    const newContext = enhanceContext(message.context ?? {});
    const newMessage = {
      ...message,
      context: newContext,
    };
    this.nodeAnalytics.group(newMessage, callback);
    return this;
  }

  flush(
    callback?: (err: Error, data: Data) => void
  ): Promise<{ batch: Array<unknown>; timestamp: string; sentAt: string }> {
    // todo: fix batch type
    return this.nodeAnalytics.flush(callback);
  }
}
