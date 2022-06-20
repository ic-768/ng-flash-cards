import { Component } from '@angular/core';

type Card = { emoji: string; isFlipped: boolean };
type Deck = Card[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-flash-cards';
  emojis = ['😃', '🧘', '♂️', '🌍', '🌦️', '🍞', '🏁'];
  deck: Deck = this.generateCards();
  flippedCards: Card[] = [];
  points = 0;

  lockClick = false; // used to disable clicking when showing cards with setTimeOut
  hasGameStarted = false;

  getCardClass(card: Card) {
    if (!this.hasGameStarted || card.isFlipped) {
      return 'face-up';
    } else {
      return 'face-down';
    }
  }

  startGame() {
    this.hasGameStarted = true;
  }

  generateCards(): Deck {
    return this.emojis
      .concat(this.emojis)
      .sort(() => Math.random() - 0.5)
      .map((e) => ({ emoji: e, isFlipped: false }));
  }

  flipCard(card: Card) {
    if (!this.hasGameStarted || card.isFlipped || this.lockClick) return;
    card.isFlipped = true;
    this.flippedCards.push(card);
    if (this.flippedCards.length === 2) {
      if (this.flippedCardsMatch()) {
        this.flippedCards = [];
        this.points += 50;
      } else {
        this.lockClick = true;
        setTimeout(() => {
          this.points -= 50;
          this.lockClick = false;
          this.flippedCards.forEach((c) => (c.isFlipped = false));
          this.flippedCards = [];
        }, 1000);
      }
    }
  }

  flippedCardsMatch() {
    return this.flippedCards[0].emoji === this.flippedCards[1].emoji;
  }
}
