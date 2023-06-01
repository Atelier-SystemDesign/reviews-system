const router = require('express').Router();
const { reviews } = require('../controller');

router.get('/reviews', reviews.getReviews);
router.post('/reviews', reviews.addReviews);
// router.put('/reviews/helpful/:review_id', reviews.markReviewAsHelpful);
router.put('/reviews/:review_id/helpful', reviews.markReviewAsHelpful);
router.put('/reviews/:review_id/report', reviews.reportReview);
router.get('/reviews/meta', reviews.getReviewsMetaData);

module.exports = router;
