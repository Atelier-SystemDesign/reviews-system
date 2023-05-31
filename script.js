import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '10s', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 seconds.
    { duration: '30s', target: 200 }, // stay at higher 200 users for 30 seconds
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {
  http.get(`http://localhost:3456/reviews?${Math.floor(Math.random() * 100000) + 50000}`);
  sleep(1);
};
