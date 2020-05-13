import { Router, Request, Response } from 'express';

const router = Router();

const passport = require('passport');
// test!
router.get('/login', (req: Request, res: Response) => {
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Mary', lastName: 'Swan' },
    { id: 3, firstName: 'Jane', lastName: 'Smith' },
  ];
  res.json(customers);
});

router.get('/logout', (req: Request, res: Response) => {
  // handle with passport
  res.send('logging out');
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the callback URI');
});

module.exports = router;
