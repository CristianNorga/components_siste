import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { CameraComponent } from './camera.component';
import { FindValueInConfigByLangPipe } from '../../utils/pipes/find-value-in-config-by-lang.pipe';
import { textsBase } from './camera.data'
import { loadTextsToLocalStorage } from '../../utils/utils'

loadTextsToLocalStorage(textsBase);

const meta: Meta<CameraComponent> = {
	title: 'Media/Camera',
	component: CameraComponent,
	decorators: [moduleMetadata({
    declarations: [FindValueInConfigByLangPipe],
  })],
	tags: ['autodocs'],
	argTypes: {
		// backgroundColor: {
		// 	control: 'color',
		// },
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		eventSendPhoto: fn(),
		cameraError: fn(),
		closeCamera: fn(),
		modalClose: fn(),
	},
};

export default meta;
type Story = StoryObj<CameraComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		typeImage: 'fileImage',
		storeId: '5e7cfb39ead1af0edcfb1241',
	},
};
