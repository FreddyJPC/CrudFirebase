import { Component, inject } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { CardService } from '../../services/card.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Card } from '../models/card.interface';
import { Deck } from '../models/deck.interface';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  
  private readonly cardsService = inject(CardService);
  private readonly deckService = inject(DeckService);
  private readonly activateRoute = inject(ActivatedRoute);

  search = new FormControl('');
  cards$!: Observable<Card[]>

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    author: new FormControl(''),
    deck: new FormControl<string[]>([],{nonNullable: true}),
  });





  id!: string;
  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];

   this.deckService.getDeck(this.id)
   .subscribe((data) => this.form.patchValue(data)); 


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
    this.form.controls.deck.setValue([...this.form.controls.deck.value, card.card_images[0].image_url
  ]);
}


removeCard(card: string) {
  const updatedDeck = this.form.controls.deck.value.filter((c) => c !== card);
  this.form.controls.deck.setValue(updatedDeck);

}
updateDeck() {
  this.deckService.updateDeck(this.form.value as Deck, this.id);

}

}


