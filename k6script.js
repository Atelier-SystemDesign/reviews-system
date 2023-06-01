import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '5s', target: 250 }, // traffic ramp-up from 1 to a higher 200 users over 10 seconds.
    { duration: '25s', target: 1000 }, // stay at higher 200 users for 30 seconds
  ],
};
const randomID = Math.floor(Math.random() * 10000) + 50000;

const getReviews = () => {
  const res = http.get(`http://localhost:3456/api/reviews?product_id=${randomID}`);
  check(res, {
    'check if status is 200': (r) => r.status === 200,
  });
  sleep(1);
};

const getMetaData = () => {
  const res = http.get(`http://localhost:3456/api/reviews/meta?product_id=${randomID}`);
  check(res, {
    'check if status is 200': (r) => r.status === 200,
  });
  sleep(1);
};

const postAReview = () => {
  const data = {
    product_id: 8765,
    rating: 5,
    summary: 'this is a test summary',
    body: 'test body for load testings',
    recommend: true,
    name: 'testname',
    email: 'teasdsada@test.com',
    photos: [
      'asasdsdasdaads.jpg',
      'gjeirgjerg.jpg',
    ],
    characteristics: {
      45: 2,
      11: 3,
      62: 4,
    },
  };
  const res = http.post(`http://localhost:3456/api/reviews?product_id=${randomID}`, JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
  check(res, {
    'check if status code is 201': (r) => r.status === 201,
  });
  sleep(1);
};

const putReviewHelpful = () => {
  const res = http.put(`http://localhost:3456/api/reviews/${randomID}/helpful`);
  check(res, {
    'check if status code is 204': (r) => r.status === 204,
  });
  sleep(1);
};

const putReviewReport = () => {
  const res = http.put(`http://localhost:3456/api/reviews/${randomID}/report`);
  check(res, {
    'check if status code is 204': (r) => r.status === 204,
  });
  sleep(1);
};

export default () => {
  getReviews();
  getMetaData();
  postAReview();
  putReviewHelpful();
  putReviewReport();
};
