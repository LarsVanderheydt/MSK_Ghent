import fetch from 'isomorphic-fetch';

const url = `/api/grids`;

export default {

  create: ({gridName, id, forPainting}) => {
    const method = `POST`;
    const body = new FormData();
    body.append(`gridName`, gridName);
    body.append(`id`, id);
    body.append(`forPainting`, forPainting);

    return fetch(url, {method, body})
      .then(r => r.json());
  },

  read: () => {
    return fetch(`${url}?isActive=true&perPage=9999`)
      .then(r => r.json());
  },

  delete: _id => {
    const method = `DELETE`;
    return fetch(`${url}/${_id}`, {method});
  }
};
