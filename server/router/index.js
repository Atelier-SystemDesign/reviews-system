const router = require('express').Router();
const { reviews } = require('../controller');

router.get('/reviews', reviews.getReviews);
router.post('/reviews', reviews.addReviews);
router.put('/reviews/helpful/:review_id', reviews.markReviewAsHelpful);
router.put('/reviews/report/:review_id', reviews.reportReview);
router.get('/reviews/meta', reviews.getReviewsMetaData);

module.exports = router;
