import { DatePipe } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { DatepickerComponent } from './datepicker.component';
import { FindValueInConfigByLangPipe } from '../../utils/pipes/find-value-in-config-by-lang.pipe';
// import { textsBase } from './camera.data'
import { loadTextsToLocalStorage } from '../../utils/utils';

// loadTextsToLocalStorage(textsBase);

const meta: Meta<DatepickerComponent> = {
	title: 'Form/DatePicker',
	component: DatepickerComponent,
	decorators: [
		moduleMetadata({
			declarations: [FindValueInConfigByLangPipe],
			imports: [BsDatepickerModule.forRoot(), TypeaheadModule.forRoot()],
			providers: [DatePipe],
		}),
	],
	tags: ['autodocs'],
	argTypes: {
		// typeImage: {
		// 	control: 'select',
		// 	options: ['fileImage', 'fileImageDocumentFront', 'fileImageDocumentBack'],
		// },
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
type Story = StoryObj<DatepickerComponent>;

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
