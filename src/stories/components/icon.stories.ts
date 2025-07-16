import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { IconComponent } from '../../app/components/icon/icon.component';

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      imports: [IconComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<IconComponent>;

export const MatIcon: Story = {
  args: {
    icon: { matIcon: 'face' },
    classes: ['!text-mat-yellow'],
  },
};

export const SvgIcon: Story = {
  args: {
    icon: { svgIcon: 'youtube' },
    classes: ['!text-mat-red'],
  },
};
