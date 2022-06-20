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
  lockClick = false; // used to disable clicking when showing cards with setTimeOut

  flippedCards: Card[] = [];

  getCardClass(card: Card) {
    if (!card.isFlipped) {
      return 'face-down';
    }
    if (card.isFlipped) {
      return 'face-up';
    }
    return '';
  }
  generateCards(): Deck {
    return this.emojis
      .concat(this.emojis)
      .sort(() => Math.random() - 0.5)
      .map((e) => ({ emoji: e, isFlipped: false }));
  }

  flipCard(card: Card) {
    if (card.isFlipped || this.lockClick) return;
    card.isFlipped = true;
    this.flippedCards.push(card);
    if (this.flippedCards.length === 2) {
      if (this.cardsMatch(this.flippedCards as [Card, Card])) {
        this.flippedCards = [];
      } else {
        this.lockClick = true;
        setTimeout(() => {
          this.lockClick = false;
          this.flippedCards.forEach((c) => (c.isFlipped = false));
          this.flippedCards = [];
        }, 1000);
      }
    }
  }

  cardsMatch(cards: Deck) {
    if (cards.length === 2) return cards[0].emoji === cards[1].emoji;
    else throw new Error('too many cards to check');
  }
}
