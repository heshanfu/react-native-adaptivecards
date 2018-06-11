import { CardElementType } from '../Elements/CardElementType';
import { InputElement } from './Input';
export class DateInputElement extends InputElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.max = json.max;
            this.min = json.min;
            this.placeholder = json.placeholder;
        }
    }
    getTypeName() {
        return CardElementType.DateInput;
    }
    getRequiredProperties() {
        return ['id'];
    }
}