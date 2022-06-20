import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card: Card = { emoji: '', isFlipped: false };
  @Input() hasGameStarted = false;
  @Input() click() {}

  getCardClass(card: Card) {
    if (!this.hasGameStarted || card.isFlipped) {
      return 'face-up';
    } else {
      return 'face-down';
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
