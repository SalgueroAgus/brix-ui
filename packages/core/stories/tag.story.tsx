import React from 'react';

import Tag, { TagProps } from '@ustudio-ui/core/tag';

export default {
  title: 'Data/Tag',
  component: Tag,

  argTypes: {
    backgroundColor: { control: 'text' },
    color: { control: 'text' },
    onClose: {
      control: 'boolean',
      description:
        'Generate `closeIcon`, when passed `onClose` prop. When control is true, component has onClose function',
      type: 'function',
    },
    closeIcon: {},
  },
};

export const Basic = ({ onClose, ...props }: TagProps) => {
  const handleClose = () => console.log('Handle close');

  return (
    <>
      <Tag>Default tag</Tag>

      <Tag onClose={handleClose}>Closable tag</Tag>

      <Tag {...props} onClose={onClose ? handleClose : undefined}>
        Custom tag
      </Tag>
    </>
  );
};