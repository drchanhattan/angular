import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RedPandaComponent } from '../../app/components/red-panda/red-panda.component';

const meta: Meta<RedPandaComponent> = {
  title: 'Components/Panda',
  component: RedPandaComponent,
  decorators: [
    moduleMetadata({
      imports: [RedPandaComponent],
    }),
  ],
  tags: ['!autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <div class="relative h-80 w-full flex items-end bg-mat-black">
        <app-red-panda class="mb-12"></app-red-panda>
      </div>`,
  }),
};

export default meta;
type Story = StoryObj<RedPandaComponent>;

export const RedPanda: Story = {};
