import Component, { ComponentProps } from '../../app/js/component';

export default class Row extends Component.Default {
    el1: HTMLElement;
    el2: HTMLElement;
    
    constructor(element: ComponentProps) {
        super(element);

        const [el1, el2] = this.getElements('conteiner-el');
        this.el1 = el1;
        this.el2 = el2;
     
        const button = this.getElement('footer-button');
        button.addEventListener('click', this.onClickButton);
    }

    onClickButton = () => {
        this.el1.classList.toggle('row__conteiner-el--yellow');
        this.el2.classList.toggle('row__conteiner-el--none');
    }

    destroy = () => {
        // Destroy functions
    }
}