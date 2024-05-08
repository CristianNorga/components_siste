import { DatePipe } from '@angular/common';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
	BrowserAnimationsModule,
	NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { FindValueInConfigByLangPipe } from '../../utils/pipes/find-value-in-config-by-lang.pipe';
import { DatepickerComponent } from './datepicker.component';
import { Message } from '../../utils/models/message-model';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

const messageMock: Message = {
    "message": "Comando de tipo calendar",
    "name": "Sistecrédito",
    "question": {
        "_id": "",
        "editable": false,
        "editableInLevel": false,
        "levelName": "",
        "name": "",
        "nextQuestion": "",
        "optional": false,
        "previousQuestion": null,
        "properties": [
          {
            "property": "DateInit",
            "value": "-36525"
          },
          {
              "property": "DateEnd",
              "value": "-6575"
          },
          {
              "property": "DateFormat",
              "value": "dd-MMMM-yyyy"
          },
          {
              "property": "DatePosition",
              "value": "-6576"
          }
        ],
        "textQuest": "Comando de tipo calendar",
        "type": "calendar",
        "validator": {
            "expression": null,
            "message": null
        }
    },
    "requestId": "61421596414a740001dc28d0",
    "sendMessage": true,
    "storeId": "5cbe1d8704ea5626804cfc85",
    "timestamp": {
        "seconds": 1635350587,
        "nanoseconds": 219000000
    },
    "type": "_command:",
    "typeQuestion": "calendar"
  };

  beforeEach(waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [DatepickerComponent, FindValueInConfigByLangPipe],
				imports: [
					BrowserAnimationsModule,
					BsDatepickerModule.forRoot(),
					NoopAnimationsModule,
				],
				providers: [DatePipe],
			});
		}));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    component.message = messageMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('getInfo(): subtitle and placeholder should return strings values ', () => {
    messageMock.question.properties = [
      { property: 'subtitle',
        value: 'Subtitle test'
      },
      { property: 'placeholder',
        value: 'DD-MMMM-YYYY'
      },
    ];
    component.getInfo();

    expect(component.subtitle).toBe('Subtitle test');
    expect(component.placeholder).toBe('DD-MMMM-YYYY');
  });

  it('getRangeInit(): calendarRangeInit should have a value', () => {
    messageMock.question.properties = [
      {
        property: 'DateInit', value: '-36500'
      }
    ];
    component.getRangeInit();

    expect(component.calendarRangeInit).toBe('-36500');
  });

  it('getRangeEnd(): datePosition should have a value', () => {
    messageMock.question.properties = [
      {
        property: 'DateEnd', value: '-7000'
      }
    ];
    component.getRangeEnd();

    expect(component.calendarRangeEnd).toBe('-7000');
  });

  it('getDatePosition(): datePosition should have a value', () => {
    messageMock.question.properties = [
      {
        property: 'DatePosition', value: '-7005'
      }
    ];
    component.getDatePosition();

    expect(component.datePosition).toBe('-7005');
  });

  it('getDateFormat(): datePosition should have a value', () => {
    messageMock.question.properties = [
      {
        property: 'DateFormat', value: 'dd-MM-yyyy'
      }
    ];
    component.getDateFormat();

    expect(component.dateFormat).toBe('dd-MM-yyyy');
  });


  it('onSubmit(): eventSendDate emit a value', () => {
   const spy = spyOn(component.eventSendDate, 'emit');
   component.onSubmit();

   expect(spy).toHaveBeenCalled();
  });

  it('close Input', () => {
    component.close = true;
    expect(component.getInfo()).toBeUndefined();
  });


});
