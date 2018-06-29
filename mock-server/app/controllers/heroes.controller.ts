import {Router, Request, Response} from 'express';


const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send([]);
});

router.get('/:id', (req: Request, res: Response) => {
  res.send({});
});

export const heroesController: Router = router;
