import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
} from '@angular/core';
import { Message, Property } from './datepicker.model';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
	@Output() eventSendDate = new EventEmitter<any>();

	@Input() message = new Message();
	@Input() set close(value: any) {
		this.myDateValue = new Date();
		this.getInfo();
		this.getRangeInit();
		this.getRangeEnd();
		this.getDatePosition();
		this.getDateFormat();
		this.myDateValue.setDate(
			this.myDateValue.getDate() + parseFloat(this.datePosition)
		);
		this.isOpenDatePicker = false;
	}

	@ViewChild('datePickerPreview', { static: true }) dpPreview: any;

	title = '';
	subtitle = '';
	placeholder = '';
	minDate = new Date();
	maxDate = new Date();
	myDateValue = new Date();
	calendarRangeInit = '';
	calendarRangeEnd = '';
	datePosition = '';
	dateFormat = '';
	isdate = true;
	isOpenDatePicker = false;
	datePickerConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  timeOutRef: any;

	constructor(public datePipe: DatePipe) {
		this.datePickerConfig = Object.assign(
			{},
			{
				containerClass: 'theme-dark-blue',
				adaptivePosition: true,
				showWeekNumbers: false,
				displayMonths: 1,
				dateInputFormat: 'DD-MM-YYYY',
			}
		);
		this.minDate = new Date();
		this.maxDate = new Date();
	}

	ngOnInit() {}

	getInfo() {
		this.title = this.findProperty(this.message.question.properties, 'title');
		this.subtitle = this.findProperty(
			this.message.question.properties,
			'subtitle'
		);
		this.placeholder = this.findProperty(
			this.message.question.properties,
			'placeholder'
		);
	}

	getRangeInit() {
		const optionRelationship = this.findProperty(
			this.message.question.properties,
			'DateInit'
		);
		this.calendarRangeInit = optionRelationship;
		this.minDate.setDate(
			this.minDate.getDate() + parseFloat(this.calendarRangeInit)
		);
	}

	getRangeEnd() {
		const optionRelationship = this.findProperty(
			this.message.question.properties,
			'DateEnd'
		);
		this.calendarRangeEnd = optionRelationship;
		this.maxDate.setDate(
			this.maxDate.getDate() + parseFloat(this.calendarRangeEnd)
		);
	}

	getDatePosition() {
		const optionRelationship = this.findProperty(
			this.message.question.properties,
			'DatePosition'
		);
		this.datePosition = optionRelationship || '0';
	}

	getDateFormat() {
		const optionRelationship = this.findProperty(
			this.message.question.properties,
			'DateFormat'
		);
		this.dateFormat = optionRelationship;
	}

	findProperty(properties: Property[], key: string): string {
		let propertyValue = '';
		let property: Property = new Property();
		if (properties) {
			property = properties.find((prop) => prop.property === key) || property;
		}
		if (property) {
			propertyValue = property.value;
		}
		return propertyValue;
	}

	typeDate($event: any, isCalendar: any) {
    clearTimeout(this.timeOutRef);

		this.timeOutRef = setTimeout(() => {
			const date =
				(this.dpPreview.nativeElement.target &&
					this.dpPreview.nativeElement.target.value) ||
				this.dpPreview.nativeElement.value;

			this.isdate = /^([0-2][0-9])?(3[0-1])?-((0[0-9])?(1[0-2])?)-\d{4}$/i.test(
				date
			);

      if (!this.isdate) return;

			const turnToDate = new Date(
				date.substring(6, 10),
				date.substring(3, 5) - 1,
				date.substring(0, 2)
			);
			const isValidDate =
				Date.parse(turnToDate.toString()) >= Date.parse(this.minDate.toString()) &&
				Date.parse(turnToDate.toString()) <= Date.parse(this.maxDate.toString());

			if (this.isdate && isValidDate) {
				this.isdate = true;
				if (!isCalendar) {
					this.myDateValue = turnToDate;
				}
			} else {
				this.isdate = false;
			}
		}, 150);
	}

	formatDate() {
		const date = this.datePipe.transform(this.myDateValue, this.dateFormat);
		return date;
	}

	onSubmit() {
		this.eventSendDate.emit(this.formatDate());
	}
}
