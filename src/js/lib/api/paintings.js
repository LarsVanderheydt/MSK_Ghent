import fetch from 'isomorphic-fetch';

const url = `/api/paintings`;

export default {

  create: ({image, date, isSet}) => {
    const method = `POST`;
    const newFileName = `${image.name.split(` `).join(`_`)}`;
    const body = new FormData();
    body.append(`image`, image, newFileName);
    body.append(`date`, date);
    body.append(`isSet`, isSet);

    return fetch(url, {method, body})
      .then(r => r.json());
  },

  update: ({isSet, _id}) => {
    const method = `PATCH`;
    const body = new FormData();
    body.append(`isSet`, isSet);
    body.append(`isActive`, true);

    return fetch(`${url}/${_id}`, {method, body})
    .then(r => r.json());
  },

  read: () => {
    return fetch(`${url}?isActive=true`)
      .then(r => r.json());
  },

  delete: _id => {
    const method = `DELETE`;
    return fetch(`${url}/${_id}`, {method});
  }
};
