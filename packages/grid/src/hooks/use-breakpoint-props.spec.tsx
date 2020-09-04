import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import ThemeProvider from '@ustudio-ui/theme';
import { defaultTheme } from '@ustudio-ui/theme/entity';

import { useBreakpointProps } from './use-breakpoint-props';

const matchMedia = (minWidth = 0) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: any) => {
      // eslint-disable-next-line unicorn/consistent-function-scoping, @typescript-eslint/no-empty-function
      const mock = () => {};

      return {
        matches: query === `screen and (min-width: ${minWidth}px)`,
        media: query,
        onchange: null,
        addListener: mock,
        removeListener: mock,
        addEventListener: mock,
        removeEventListener: mock,
        dispatchEvent: mock,
      };
    },
  });
};

const props = {
  color: 'red',
  sm: {
    color: 'orange',
  },
  md: {
    color: 'yellow',
  },
  lg: {
    color: 'green',
  },
  xl: {
    color: 'blue',
  },
};

const render = () => {
  return renderHook(() => (useBreakpointProps(props) as unknown) as { color: string; currentBreakpoint: number }, {
    wrapper: ({ children }) => {
      return <ThemeProvider>{children}</ThemeProvider>;
    },
  });
};

describe('useBreakpointProps', () => {
  beforeEach(() => {
    matchMedia();
  });

  describe('when no breakpoints match', () => {
    let result: ReturnType<typeof render>['result'];

    beforeEach(() => {
      result = render().result;
    });

    it('should return default props only', () => {
      const { color } = result.current;

      expect(color).toBe(props.color);
    });

    it('should match `currentBreakpoint` to the value of `xs`', () => {
      const { currentBreakpoint } = result.current;

      expect(currentBreakpoint).toBe(defaultTheme.breakpoints.xs);
    });
  });

  describe('when one of breakpoints matches', () => {
    let hook: ReturnType<typeof render>;

    beforeEach(() => {
      hook = render();

      matchMedia(defaultTheme.breakpoints.md);

      act(hook.rerender);
    });

    it('should return props from that breakpoint', () => {
      hook.waitFor(() => expect(hook.result.current.color).toBe(props.md.color));
    });

    it('should match `currentBreakpoint` to the value of a matched breakpoint', () => {
      hook.waitFor(() => expect(hook.result.current.currentBreakpoint).toBe(defaultTheme.breakpoints.md));
    });
  });
});
