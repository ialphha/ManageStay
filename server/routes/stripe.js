import express from 'express';

import { createConnectAccount,getAccountStatus,getAccountbalance,payoutSettings, stripeSessionId,stripeSuccess} from '../controllers/stripe';
import { requireSignin} from '../middleware';

//controllers
// import { } from '../controllers/auth';

const router =express.Router();

//routes for stripe related section
router.post('/createConnectAccount',requireSignin, createConnectAccount);
router.post('/get-account-status',requireSignin,getAccountStatus);
router.post('/get-account-balance',requireSignin,getAccountbalance);
router.post('/payout-setting',requireSignin,payoutSettings);
router.post('/stripe-session-id', requireSignin,stripeSessionId);
router.post('/stripe-success',requireSignin, stripeSuccess);
module.exports= router;