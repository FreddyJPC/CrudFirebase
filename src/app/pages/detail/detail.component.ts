import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  private activateRoute= inject (ActivatedRoute);
  private readonly deckService = inject(DeckService);
  deck$! : Observable<Deck>;


  ngOnInit() {
    const id = this.activateRoute.snapshot.params['id'];
    console.log(id);
    this.deck$ = this.deckService.getDeck(id);
}
}
