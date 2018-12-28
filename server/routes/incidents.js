import express from 'express';
import incidents from '../controllers/incident';
import admin from '../controllers/admin';
import validate from '../middleware/validate';
import tokenVerify from '../middleware/token';

const router = express.Router();

router.get(
  '/api/v1/incidents',
  tokenVerify.verifyToken,
  admin.getIncidents,
);
router.patch(
  '/api/v1/incidents/:id/status',
  tokenVerify.verifyToken,
  admin.updateStatus,
);

router.get(
  '/api/v1/user/profile/incidents',
  tokenVerify.verifyToken,
  incidents.getUserIncidents,
);

router.post(
  '/api/v1/incidents',
  tokenVerify.verifyToken,
  validate.validatePost,
  incidents.createIncident,
);

router.get(
  '/api/v1/incidents/:id',
  tokenVerify.verifyToken,
  incidents.getIncident,
);

router.patch(
  '/api/v1/incidents/:id/location',
  tokenVerify.verifyToken,
  validate.validatePatchLocation,
  incidents.updateLocation,
);

router.patch(
  '/api/v1/incidents/:id/comment',
  tokenVerify.verifyToken,
  validate.validatePatchComment,
  incidents.updateComment,
);

router.patch(
  '/api/v1/incidents/:id',
  tokenVerify.verifyToken,
  validate.validatePatchEdit,
  incidents.updateAll,
);

router.delete(
  '/api/v1/incidents/:id',
  tokenVerify.verifyToken,
  incidents.deleteIncident,
);

export default router;
