import { fromEvent } from 'rxjs';
import objectFitImages from 'object-fit-images';

import { getComponent, getComponents } from './component';
import '../scss/common.scss';

// SVG
const requireAll = (r: __WebpackModuleApi.RequireContext) => r.keys().forEach(r);
requireAll(require.context('../../assets/icons', true, /\.svg$/));

// Components
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Modal from '../../components/modal/modal';
import Row from '../../components/row/row';
import form from '../../components/form/form';

fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  new Header(getComponent('header'));
  new Footer(getComponent('footer'));

  if (getComponent('modal').component)
    getComponents('modal').forEach((component) => new Modal(component));

  if (getComponent('row').component)
    new Row(getComponent('row'));
    
    if (getComponent('form').component)
    new form(getComponent('form'));

    if (getComponent('form-button').component)
    new form(getComponent('form-button'));

  const images = document.querySelectorAll('img');
  objectFitImages(images);
});
