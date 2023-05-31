/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
const { reviews } = require('../model');

console.log('Running controller');

module.exports = {

  getReviews: (req, res) => {
    console.log('inside getReviews controller');
    const productID = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'newest';
    console.log(productID, page, count, sort);
    reviews.getReviews(productID, page, count, sort)
      .then((data) => {
        res.status(200).send({
          product: productID,
          page,
          count,
          results: data.rows,
        });
      }).catch((err) => {
        console.log('Error in retrieving reviews from db', err);
        res.sendStatus(500);
      });
  },

  getReviewsMetaData: (req, res) => {
    console.log('request in meta data controller');
    const productID = req.query.product_id;
    const ratings = {};
    const characteristics = {};
    const recommended = {};
    const response = {};
    reviews.getReviewsMetaData(productID).then((data) => {
      data[0].rows.forEach((rating) => {
        console.log(rating.rating, 'Score', rating.count, 'count');
        ratings[rating.rating] = rating.count;
        console.log(ratings);
      });
      data[1].rows.forEach((recommend) => {
        if (recommend.recommended === true) {
          recommend.recommended = 1;
          recommended[recommend.recommended] = recommend.count;
        } else if (recommend.recommended === false) {
          recommend.recommended = 0;
          recommended[recommend.recommended] = recommend.count;
        }
      });
      console.log('recommended object', recommended);
      data[2].rows.forEach((characteristic) => {
        characteristics[characteristic.name] = {
          id: characteristic.id,
          value: characteristic.value,
        };
      });
      console.log('characterisctics object', characteristics);
      response.product_id = productID;
      response.ratings = ratings;
      response.recommended = recommended;
      response.characteristics = characteristics;
      console.log('response', response);
      res.json(response);
    }).catch((err) => {
      console.log('Error in retrieving reviews meta data from db', err);
      res.sendStatus(500);
    });
  },

  addReviews: (req, res) => {
    // console.log('req  rating', req.params, 'req body', req.body);
    let {
      product_id, rating, summary,
      body, recommend, name, email, photos, characteristics,
    } = req.body;
    product_id = Number(product_id);
    rating = rating || 5;
    summary = summary || '';
    body = body || '';
    recommend = recommend || false;
    name = name || '';
    email = email || '';
    photos = photos || [];
    characteristics = characteristics || {};
    console.log('add reviews parameters', product_id, rating, summary, body, recommend, name, email, photos, characteristics);
    reviews.addReviews(product_id, rating, summary, body, recommend, name, email, photos, characteristics).then(() => {
      res.sendStatus(201);
    }).catch((err) => {
      console.log(err, 'error in db response from reviews addReviews');
      res.sendStatus(500);
    });
  },

  markReviewAsHelpful: (req, res) => {
    reviews.markReviewAsHelpful(req.params.review_id).then((data) => {
      console.log('helpful data', data);
      res.sendStatus(204);
    }).catch(() => {
      res.sendStatus(500);
    });
  },

  reportReview: (req, res) => {
    reviews.reportReview(req.params.review_id)
      .then((data) => {
        console.log('report review data', data);
        res.sendStatus(204);
      }).catch(() => {
        res.sendStatus(500);
      });
  },
};
