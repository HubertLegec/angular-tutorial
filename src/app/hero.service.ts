import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly URL = 'api/heroes';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  get heroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.URL)
      .pipe(
        tap(() => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    this.log(`fetched hero id=${id}`);
    return this.http.get<Hero>(`${this.URL}/${id}`)
      .pipe(
        tap(() => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.URL}/${hero.id}`, {name: hero.name}, httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.addMessage(`HeroService: ${message}`);
  }
}
