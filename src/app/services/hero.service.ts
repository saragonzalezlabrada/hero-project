import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  environment = 'http://localhost:3000/heroes';

  constructor(
    private http: HttpClient
  ) { }

  getHeroes(): Observable<any> {
    return this.http.get(`${this.environment}`);
  }

  getHeroById(id: string): Observable<object> {
    return this.http.get(`${this.environment}/${id}`);
  }

  editHero(id: string, hero: any): Observable<object> {
    return this.http.put(`${this.environment}/${id}`, hero);
  }

  createHero(hero: Hero): Observable<object> {
    return this.http.post(`${this.environment}`, hero);
  }
  
  deleteHero(id: string): Observable<object> {
    return this.http.delete(`${this.environment}/${id}`);
  }
}
