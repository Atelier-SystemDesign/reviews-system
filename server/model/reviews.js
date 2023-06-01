/* eslint-disable max-len */
/* eslint-disable camelcase */
const client = require('../../database');

module.exports = {
  getReviews: (product_id, page, count, sort) => {
    let ord = '';
    if (sort === 'newest') {
      ord = 'ORDER BY r.date DESC';
    } else if (sort === 'helpful') {
      ord = 'ORDER BY r.helpfulness DESC';
    } else if (sort === 'relevant') {
      ord = 'ORDER BY r.helpfulness DESC, r.date DESC';
    }
    // By default node-postgres creates a map from the name to value of
    // each column, giving you a json-like object back for each row.
    return client.query(`SELECT r.id as review_id, r.rating, r.summary, r.recommend, r.response, r.body, TO_TIMESTAMP(r.date/1000) as date, r.reviewer_name, r.reviewer_email, r.helpfulness, json_agg(json_build_object(
      'id', rp.id,
      'url', rp.url
    )) as photos
    FROM reviews r
    JOIN reviews_photos rp ON r.id = rp.review_id
    WHERE r.product_id = ${product_id} AND r.reported = false
    GROUP BY r.id
    ${ord}
    LIMIT ${count}
    OFFSET ${count * page - count};`).catch((err) => console.log('cannot get reviews from db', err));
  },

  getReviewsMetaData: (product_id) => {
    // ratings data
    const ratingsQuery = {
      text: `SELECT rating, count(id) FROM reviews
      WHERE product_id =$1
      GROUP BY rating`,
      values: [product_id],
    };
    // recommendation data
    const recommendQuery = {
      text: `SELECT recommend as recommended, count(id) FROM reviews
      WHERE product_id =$1
      GROUP BY recommend`,
      values: [product_id],
    };
    // characteristics data
    const charQuery = {
      text: `SELECT char.name, char.id, AVG(cr.value) as value FROM characteristics as char
      JOIN characteristic_reviews as cr ON char.id = cr.characteristic_id
      WHERE product_id =$1
      GROUP BY char.name, char.id`,
      values: [product_id],
    };
    const queryObj = client.query(ratingsQuery).catch((err) => console.log('cannot get rating meta data from db', err));
    const queryObj2 = client.query(recommendQuery).catch((err) => console.log('cannot get recommend meta data from db', err));
    const queryObjt3 = client.query(charQuery).catch((err) => console.log('cannot get characteristics meta data from db', err));

    return Promise.all([queryObj, queryObj2, queryObjt3]);
  },

  addReviews: (product_id, rating, summary, body, recommend, name, email, photos, characteristics) => {
    const query = {
      text: `INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`,
      values: [product_id, rating, summary, body, recommend, name, email],
    };
    return client.query(query).then((data) => {
      const review_id = data.rows[0].id;
      photos.forEach((photo) => {
        client.query(`INSERT INTO reviews_photos (review_id, url)
        VALUES($1, $2)`, [review_id, photo.url])
          .catch((err) => console.log('cannot add reviews photos to the db', err));
      });
      Object.keys(characteristics).forEach((id) => {
        client.query('INSERT INTO characteristic_reviews (characteristic_id, review_id, value) VALUES($1, $2, $3)', [id, review_id, characteristics[id]]).then(
          (res) => console.log(res.rows[0]),
        ).catch((err) => console.log('cannot add characteristics review to the db', err));
      });
    });
  },

  markReviewAsHelpful: (review_id) => {
    const queryHelpful = {
      text: `UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE id = $1`,
      values: [review_id],
    };
    return client.query(queryHelpful).catch((err) => console.log('cannot mark review as helpful db error', err));
  },

  reportReview: (review_id) => {
    const queryReport = {
      text: `UPDATE reviews
      SET reported = true
      WHERE id = $1`,
      values: [review_id],
    };
    return client.query(queryReport).catch((err) => console.log('cannot report review db error', err));
  },
};
