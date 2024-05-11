import { Meta, StoryObj } from '@storybook/angular';
import { CarouselComponent } from './carousel.component';

const meta: Meta<CarouselComponent> = {
	title: 'Sliders/Carousel',
	component: CarouselComponent,
	tags: ['autodocs'],
	argTypes: {
		selected: {
      control: 'number',
    },
		// storeId: {
		// 	options: ['5e7cfb39ead1af0edcfb1241', '5e7cfb39ead1af0edcfb1242'],
		// 	control: {
		// 		type: 'select',
		// 		labels: {
		// 			'5e7cfb39ead1af0edcfb1241': 'idStore persona',
		// 			'5e7cfb39ead1af0edcfb1242': 'idStore credinet',
		// 		},
		// 	},
		// },
	},
	args: {
		// eventSendPhoto: fn(),
		// cameraError: fn(),
		// closeCamera: fn(),
		// modalClose: fn(),
		// storeId: '5e7cfb39ead1af0edcfb1241',
	},
};

export default meta;
type Story = StoryObj<CarouselComponent>;

export const Primary: Story = {
  args: {
    selected: 0,
  },
};

// export const FileImageDocumentFront: Story = {
// 	args: {
// 		typeImage: 'fileImageDocumentFront',
// 	},
// };

// export const FileImageDocumentBack: Story = {
// 	args: {
// 		typeImage: 'fileImageDocumentBack',
// 	},
// };
