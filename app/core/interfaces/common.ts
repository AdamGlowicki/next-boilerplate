import {
  ComponentPropsWithRef,
  ElementType,
} from 'react';

export type Nullable<T = undefined> = T | null;

export enum RequestStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export type MergeElementProps<
  T extends ElementType,
  // Check this comment: https://github.com/microsoft/TypeScript/issues/21732#issuecomment-886221640
  // eslint-disable-next-line @typescript-eslint/ban-types
  P extends object = {}
> = Omit<ComponentPropsWithRef<T>, keyof P> & P;
