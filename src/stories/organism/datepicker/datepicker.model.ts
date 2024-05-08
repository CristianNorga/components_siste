export class Property {
    property: string;
    value: string;
}

export class Message {
	id?: string = '';
	message?: string = '';
	name: string = '';
	sendMessage: boolean = false;
	typeQuestion: string = '';
	question: Question = new Question();
	status?: boolean = false;
	isLast?: boolean = false;
	storeId: string = '';
	type: string = '';
	timestamp: any;
	requestId: string = '';
}

export class Question {
	_id?: string = '';
	name: string = '';
	editable: boolean = false;
	levelName: string = '';
	editableInLevel: boolean = false;
	textQuest: string = '';
	type: string = '';
	optional: boolean = false;
	previousQuestion?: string | null = '';
	nextQuestion: string | null = '';
	validator: Validator = new Validator();
	properties: Property[] = [];
}

export class Validator {
	expression: RegExp | null = /A/;
	message: string | null = '';
}