import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/music.json', name: 'Music' },
      { id: 'data/sports.json', name: 'Sports' },
      { id: 'data/history.json', name: 'History' },
      { id: 'data/science.json', name: 'Science' }
    ];
  }

}
