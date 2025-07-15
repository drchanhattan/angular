import { provideHttpClient } from '@angular/common/http';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import docJson from '../documentation.json';
import { SvgIconRegistryModule } from '../src/app/components/icon/svg-icon-registry.module';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
    moduleMetadata({
      imports: [SvgIconRegistryModule],
    }),
  ],
};

export default preview;
