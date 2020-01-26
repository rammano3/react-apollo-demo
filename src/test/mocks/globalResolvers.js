import faker from 'faker';
import { SEED_INT } from 'test/constants';

export default () => {
  faker.seed(SEED_INT);
  return {
    FormattedNumber: () => faker.random.number(),
  };
};
