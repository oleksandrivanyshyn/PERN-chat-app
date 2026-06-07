import { Router } from 'express';

const router = Router();
router.get('/conversation', (req, res) => {
  res.send('Conversation');
});

export default router;
