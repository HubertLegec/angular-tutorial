import {Router, Request, Response} from 'express';

const heroes = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

function getNextHeroId() {
  if (heroes.length < 1) {
    return 1;
  }
  const ids = heroes
    .map(h => h.id);
  return Math.max(...ids) + 1;
}


const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(heroes);
});

router.get('/:id', (req: Request, res: Response) => {
  const heroId = Number(req.params.id);
  console.log(`Get hero with id: ${heroId}`);
  const hero = heroes.find(h => h.id === heroId);
  if (hero) {
    res.send(hero);
  } else {
    res.sendStatus(404);
  }
});

router.put('/:id', (req: Request, res: Response) => {
  const heroId = Number(req.params.id);
  console.log(`Update hero with id: ${heroId}`);
  const newName = req.body.name;
  const hero = heroes.find(h => h.id === heroId);
  if (hero) {
    hero.name = newName;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req: Request, res: Response) => {
  const newName = req.body.name;
  const newId = getNextHeroId();
  heroes.push({name: newName, id: newId});
  res.sendStatus(200);
});

export const heroesController: Router = router;
