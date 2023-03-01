import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

interface Testimonial {
  author: string;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s 0.2s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(10, style({ opacity: 0 }))
      ])
    ])
  ]


})
export class HomeComponent {

  testimonials: Testimonial[] = [
    { author: 'Mowafak A.', text: "Vi har använt E-Husets bokningstjänst flera gånger nu och har alltid haft en positiv upplevelse." },
    { author: 'Victor S.', text: "Jag är så tacksam för E-Husets bokningstjänst! Att ha tillgång till ett dedikerat grupprum har verkligen ökat vår produktivitet och hjälpt oss att slutföra vårt arbete i tid." },
    { author: 'Kaan S.', text: "Jag var imponerad av E-Husets bokningstjänst - det var enkelt att använda och vi kunde boka rummet på nolltid. Grupprummet var också mycket trevligt och hade allt vi behövde för att arbeta i en produktiv miljö." },
    { author: 'David S.', text: "E-Husets grupprum är perfekta för vår studiegrupp. Vi har använt dem i flera månader nu och är mycket nöjda med faciliteterna och den enkla bokningsprocessen." },
    { author: 'Gabriela T.', text: "As an international student, I have always struggled to find suitable places to study on campus. E-Huset's booking service has really helped me to find a quiet and comfortable space to work on my projects."},

    
  ];

  currentSlide: number = 0;

  constructor() { }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide + this.testimonials.length - 1) % this.testimonials.length;
  }



}


