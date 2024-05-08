// import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
// import { fn } from '@storybook/test';
// import { CameraComponent } from './camera.component';
// import { FindValueInConfigByLangPipe } from '../../utils/pipes/find-value-in-config-by-lang.pipe';
// import { textsBase } from './camera.data'
// import { loadTextsToLocalStorage } from '../../utils/utils'

// loadTextsToLocalStorage(textsBase);

// const meta: Meta<CameraComponent> = {
// 	title: 'Media/Camera',
// 	component: CameraComponent,
// 	decorators: [
// 		moduleMetadata({
// 			declarations: [FindValueInConfigByLangPipe],
// 		}),
// 	],
// 	tags: ['autodocs'],
// 	argTypes: {
// 		typeImage: {
// 			control: 'select',
// 			options: ['fileImage', 'fileImageDocumentFront', 'fileImageDocumentBack'],
// 		},
// 		storeId: {
// 			options: ['5e7cfb39ead1af0edcfb1241', '5e7cfb39ead1af0edcfb1242'],
// 			control: {
// 				type: 'select',
// 				labels: {
// 					'5e7cfb39ead1af0edcfb1241': 'idStore persona',
// 					'5e7cfb39ead1af0edcfb1242': 'idStore credinet',
// 				},
// 			},
// 		},
// 	},
// 	args: {
// 		eventSendPhoto: fn(),
// 		cameraError: fn(),
// 		closeCamera: fn(),
// 		modalClose: fn(),
// 		storeId: '5e7cfb39ead1af0edcfb1241',
// 	},
// };

// export default meta;
// type Story = StoryObj<CameraComponent>;

// export const FileImage: Story = {
// 	args: {
// 		typeImage: 'fileImage',
// 	},
// };

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
