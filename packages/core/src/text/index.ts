import { createElement, Ref } from 'react';

import { TextElement } from '@brix-ui/types/html';
import { intrinsicComponent } from '@brix-ui/utils/functions';

import Text from './text.component';
import type { TextProps } from './text.props';

const createTextElement = <R extends Ref<TextElement>>(props: TextProps, ref: R, as: TextProps['as']) => {
  return createElement(Text, {
    as,
    ...props,
    ref,
  });
};

const H1 = intrinsicComponent<TextProps, HTMLHeadingElement>(function H1(props, ref) {
  return createTextElement(props, ref, 'h1');
});

const H2 = intrinsicComponent<TextProps, HTMLHeadingElement>(function H2(props, ref) {
  return createTextElement(props, ref, 'h2');
});

const H3 = intrinsicComponent<TextProps, HTMLHeadingElement>(function H3(props, ref) {
  return createTextElement(props, ref, 'h3');
});

const H4 = intrinsicComponent<TextProps, HTMLHeadingElement>(function H4(props, ref) {
  return createTextElement(props, ref, 'h4');
});

const H5 = intrinsicComponent<TextProps, HTMLHeadingElement>(function H5(props, ref) {
  return createTextElement(props, ref, 'h5');
});

const P = intrinsicComponent<TextProps, HTMLParagraphElement>(function P(props, ref) {
  return createTextElement(props, ref, 'p');
});

const Span = intrinsicComponent<TextProps, HTMLSpanElement>(function Span(props, ref) {
  return createTextElement(props, ref, 'span');
});

export type { TextProps };
export { H1, H2, H3, H4, H5, P, Span };

export default Text;
