import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import App from './components/App.jsx';

const grabInfo = (id) => {
  const promises = [
    axios.get(`/products/${id}`),
    axios.get(`/products/${id}/styles`),
    axios.get(`/products/${id}/related`),
  ];
  return Promise.all(promises);
};

let id;

window.location.pathname.length > 1 ?
  id = window.location.pathname.replaceAll('/', '') :
  id = 65631;

grabInfo(id)
  .then((data) => {
    let product = data[0].data;
    let styles = data[1].data;
    let related = data[2].data;
    ReactDOM.render(<App
      getProduct={product}
      getStyles={styles}
      getRelated={related}
      grabInfo={grabInfo}
    />, document.getElementById('App'));
  })
  .catch((err) => {
    console.log(err);
    ReactDOM.render(<div>Error please contact admin</div>, document.getElementById('App'));
  })

const getProductReviews = (id, sort) => {
  const promises = [
    axios.get(`/reviews/${id}/${sort}`),
  ];
  return Promise.all(promises);
};

const getProductMeta = (id) => {
  const promises = [
    axios.get(`/reviews/meta/${id}}`),
  ];
  return Promise.all(promises);
};

getProductReviews(id, 'relevant')
  .then((res) => {
    let reviews = res.data;
  });

getProductMeta(id)
  .then((res) => {
    let meta = res.data;
  });
