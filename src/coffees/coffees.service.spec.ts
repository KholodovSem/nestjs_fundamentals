import { TestBed } from '@automock/jest';
import { Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entity/coffee.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Coffees Service', () => {
  let coffeesService: CoffeesService;
  let coffeeRepo: jest.Mocked<Repository<Coffee>>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(CoffeesService).compile();

    coffeesService = unit;
    coffeeRepo = unitRef.get(getRepositoryToken(Coffee) as string);
  });

  it('Coffees service should be defined', () => {
    expect(coffeesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should retrieve all coffees from database', async () => {
      const mockCoffees: Coffee[] = [
        {
          id: 1,
          name: 'Coffee',
          brand: 'Nescafe',
          flavors: [{ id: 1, name: 'smooth', coffees: [] }],
          recommendations: 0,
        },
      ];

      coffeeRepo.find.mockResolvedValue(mockCoffees);

      const coffees = await coffeesService.findAll({});

      expect(coffeeRepo.find).toHaveBeenCalled();
      expect(coffees).toEqual(mockCoffees);
    });
  });
});
