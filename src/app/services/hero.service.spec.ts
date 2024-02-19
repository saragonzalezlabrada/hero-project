import { HttpClient } from '@angular/common/http';
import { HeroService } from './hero.service';
import { of } from 'rxjs';
import { mockHeroes } from '../mock/mockHeroes';

describe('HeroService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: HeroService;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post', 'delete']);
    service = new HeroService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getHero()', () => {
    httpClientSpy.get.and.returnValue(of(mockHeroes));
    service.getHeroes().subscribe({
      next: (resp) => {
        expect(resp).toEqual(mockHeroes);
      },
      error: () => {}
    });
  });

  it('#getHeroById()', () => {
    const id = '2';
    let heroData = {
      "id": "2",
      "name": "Spiderman",
      "age": 25
    };

    httpClientSpy.get.and.returnValue(of(heroData));
    service.getHeroById(id).subscribe({
      next: (resp) => {
        expect(resp).toEqual(heroData);
      },
      error: () => {}
    });
  });

  it('#editHero()', () => {
    const id = '2';
    let heroData = {
      "id": "2",
      "name": "Spiderman2",
      "age": 86
    };

    httpClientSpy.put.and.returnValue(of(heroData));
    service.editHero(id, heroData).subscribe({
      next: (resp) => {
        expect(resp).toEqual(heroData);
      },
      error: () => {}
    });
  });

  it('#createHero()', () => {
    let heroData = {
      "id": '100',
      "name": "Nuevo",
      "age": 10
    };

    httpClientSpy.post.and.returnValue(of(heroData));
    service.createHero(heroData).subscribe({
      next: (resp) => {
        expect(resp).toEqual(heroData);
      },
      error: () => {}
    });
  });

  it('#deleteHero()', () => {
    const id = '100';

    httpClientSpy.delete.and.returnValue(of(mockHeroes));
    service.deleteHero(id).subscribe({
      next: (resp) => {
        expect(resp).toEqual(mockHeroes);
      },
      error: () => {}
    });
  });
});
