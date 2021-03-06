import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { applyDisplayNames } from '@brix-ui/utils/functions';
import Block from '@brix-ui/core/block';
import { Direction } from '@brix-ui/types/css';

import type { GridProps } from './grid.props';

const parseGap = (gap: GridProps['gap']): FlattenSimpleInterpolation | undefined => {
  if (!gap) {
    return;
  }

  if (typeof gap === 'string') {
    return css`
      grid-gap: ${gap};
    `;
  }

  return css`
    grid-row-gap: ${gap.vertical};
    grid-column-gap: ${gap.horizontal};
  `;
};

const Grid = styled(Block)<{
  $direction: GridProps['direction'];
  $gap: GridProps['gap'];
  $maxWidth: Extract<GridProps['maxWidth'], string> | undefined;
  template: Extract<GridProps['template'], string> | undefined;
  areas: string;
  fractionsCount: number;
}>(({ $direction: direction, $gap: gap, $maxWidth: maxWidth, areas, template, fractionsCount }) => {
  const templateDirection = direction === Direction.Column ? Direction.Row : Direction.Column;

  return css`
    display: grid;

    ${parseGap(gap)};

    grid-template-areas: ${areas};
    ${`grid-template-${templateDirection}s`}: ${template || `repeat(${fractionsCount}, 1fr)`};

    max-width: ${maxWidth};
  `;
});

const Styled = applyDisplayNames({ Grid });

export default Styled;
