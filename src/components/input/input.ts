import { error } from 'node:console';
import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';

export default class Input extends Component.Default {
    input: HTMLInputElement;
    name: string;
    required: boolean;
    value: string;
    error: HTMLElement;
    valid: boolean = false;
    type: string;
    regex: RegExp;
    onChange: () => void;

    constructor(element: ComponentProps, onChange: () => void) {
        super(element);

        this.input = this.nRoot.querySelector('input');
        this.name = this.input.name;
        this.value = this.input.value;
        this.required = this.input.hasAttribute('data-required');

        this.error = this.getElement('error');

        switch (this.type) {
            case 'email':
                this.regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                break;
            default:
                this.regex = null;
                break;
        }

        this.onChange = onChange;
        fromEvent(this.input, 'input').subscribe(this.onChangeInput);
    }

    getValid = () => this.getValid;

    onChangeInput = (e: Event) => {
        this.value = (<HTMLInputElement>e.target).value;

        switch (this.type) {
            case 'email':
                const valid = this.regex.test(this.value);
                this.valid = valid;
                console.log(valid);
                this.setError(valid, 'Неверно набран email');
                break;
            default:
                this.valid = this.value.length > 0;
                break;
        }

        this.value.length ? this.nRoot.classList.add('fill') : this.nRoot.classList.remove('fill');
        if (this.required) this.onChange();
    };
    setError = (error: boolean, content: string) => {
        !error ? this.error.innerHTML = content : this.error.innerHTML = '';
    };

    destroy = () => {
        // Destroy functions
    }
}