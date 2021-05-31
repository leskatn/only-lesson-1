import Component, { ComponentProps, getComponent, getComponents } from '../../app/js/component';
import Input from '../input/input';
import FormButton from '../form-button/form-button';
import axios from 'axios';

export default class Form extends Component.Default {
    nInputs: Input[];
    nFormButton: FormButton;

    constructor(element: ComponentProps) {
        super(element);

        this.nInputs = getComponents('input', this.nRoot).map(component => new Input(component, this.updateButton));
        this.nFormButton = new FormButton(getComponent('form-button', this.nRoot));

        this.nRoot.addEventListener('submit', this.onSubmit);
    }
    updateButton = () => {
        const state = this.nInputs.every(item => {
            if (item.required) return item.valid;
            return true;
        });

        this.nFormButton.setDisabled(!state);
    }

    onSubmit = (e: Event) => {
        e.preventDefault();

        let data: any = {};

        data['nameId'] = `${Date.now()}_leskatn`;

        this.nInputs.forEach(item => {
            data[item.name] = item.value;
        });
        
        axios({
            method: 'post',
            url: 'http://dev.studio-mind.ru/api/form',
            data
          })
          .then((response) => {
              console.log(response);

              if (response.status === 200) {
                  // 
              }
          })
          .catch((error) => {
              console.log(error);
          });
    }

    destroy = () => {
        // Destroy functions
    }
}