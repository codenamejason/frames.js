import type { Frame, FrameButton } from "..";
import { FarcasterFrameContext } from "./farcaster";

export interface SignerStateInstance<
  T = object,
  B extends FrameActionBodyPayload = FrameActionBodyPayload,
> {
  signer?: T | null;
  hasSigner: boolean;
  signFrameAction: (actionContext: {
    target?: string;
    frameButton: FrameButton;
    buttonIndex: number;
    url: string;
    inputText?: string;
    signer: T | null;
    state?: string;
    frameContext: FrameContext;
  }) => Promise<{
    body: B;
    searchParams: URLSearchParams;
  }>;
  isLoading?: boolean;
  /** A function called when a frame button is clicked without a signer */
  onSignerlessFramePress: () => void;
  logout?: () => void;
}

type FrameStackBase = {
  timestamp: Date;
  method: "GET" | "POST";
  /** speed in seconds */
  speed: number;
  url: string;
};

export type FramesStack = Array<
  | (FrameStackBase & {
      frame: Frame;
      frameValidationErrors: null | Record<string, string[]>;
      isValid: boolean;
    })
  | (FrameStackBase & {
      requestError: unknown;
    })
>;

export type FrameState = {
  /** The frame at the top of the stack (at index 0) */
  frame: Frame | null;
  /** A stack of frames with additional context, with the most recent frame at index 0 */
  framesStack: FramesStack;
  isLoading: boolean;
  inputText: string;
  setInputText: (s: string) => void;
  onButtonPress: (frameButton: FrameButton, index: number) => void;
  /** Whether the frame at the top of the stack has any frame validation errors. Undefined when the frame is not loaded or set */
  isFrameValid: boolean | undefined;
  frameValidationErrors: Record<string, string[]> | undefined | null;
  error: null | unknown;
  homeframeUrl: string | null;
};

export type onMintArgs = {
  target: string;
  frameButton: FrameButton;
  frame: Frame;
};

export const themeParams = [
  "bg",
  "buttonColor",
  "buttonBg",
  "buttonBorderColor",
  "buttonRadius",
  "buttonHoverBg",
] as const;

export type FrameTheme = Partial<Record<(typeof themeParams)[number], string>>;

export interface FrameActionBodyPayload {}

export type FrameContext = FarcasterFrameContext;