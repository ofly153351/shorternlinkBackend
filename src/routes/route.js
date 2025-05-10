const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const historyController = require('../controllers/history.controller');
const reportsController = require('../controllers/reports.controller');
//user
router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.post('/shorted', userController.createShortUrl)

// router.post('/shorten', userController.createShoternLinks);
//history
router.get('/myhistory/:userId', historyController.getHistory);

//reports
router.get('/click/:historyId', reportsController.getAllclcks);
router.get('/linkscount', reportsController.getAllLinksCount);
router.get('/todaylinks', reportsController.todayLinksCount);

router.get('/clickthislinkcount', reportsController.getUserClicked)
router.get('/allclickthislinkcount', reportsController.getAllClickedThisLink)
//linkclick count
router.put('/clicked', reportsController.incrementLinkClicked);

module.exports = router;