import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz, QuizConfig } from '../models/index';
import { AuthService } from '../auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [QuizService,AuthService]

})
export class HomePageComponent implements OnInit {
  quizes: any;
  username: any;
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };


  constructor(private http: HttpClient, private quizService: QuizService, private auth: AuthService) { }
  

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
    this.username = this.auth.getToken();
  }
  

  private newMethod() {
    return this;
  }

  loadQuiz(quizName: string) {
    let params = new HttpParams();
    params = params.append('quizName',quizName);
    
    this.http.get('http://localhost:3000/home',{params:params}).subscribe(res=>{
    console.log("res",typeof res);
    
    
    this.quiz = new Quiz(res);
    console.log(res);
    
    });
    this.mode = 'quiz';
    }
}
