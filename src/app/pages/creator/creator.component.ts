import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { CardService } from '../../services/card.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Card } from '../models/card.interface';
import { Deck } from '../models/deck.interface';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, AsyncPipe],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent {
  private readonly cardsService = inject(CardService);
  private readonly deckService = inject(DeckService);

  search = new FormControl('');
  cards$!: Observable<Card[]>

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    author: new FormControl(''),
    deck: new FormControl<string[]>([],{nonNullable: true}),
  });


  ngOnInit() {
   this.search.valueChanges
   .pipe(debounceTime(1000))
   .subscribe((res)=> {
    if(res) {
      this.cards$ = this.cardsService.getCards(res);
    }
  });
    this.cardsService.getCards('Dark Magician').subscribe(cards => {
      console.log(cards);
    });
  }

  addCard(card: Card) {
    this.form.controls.deck.setValue([
      ...this.form.controls.deck.value,
       card.card_images[0].image_url
  ]);
}

saveDeck() {
  this.deckService
  .addDeck(this.form.value as Deck)
  .subscribe((res) => console.log(res));
}
}
