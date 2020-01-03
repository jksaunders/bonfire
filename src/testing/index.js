// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent as testingLibraryFireEvent } from '@testing-library/react';

export * from './snapshot';
export const fireEvent = testingLibraryFireEvent;
