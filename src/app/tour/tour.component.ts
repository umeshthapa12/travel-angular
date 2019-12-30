import { Component, OnInit, Input, Output } from '@angular/core';
import { Tour } from 'src/app/tour'
import { EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  @Input() tour: Tour
  @Output() onDelete: EventEmitter<Tour>

  private cartService: CartService

  constructor(cartSerevice: CartService) { 
    this.onDelete = new EventEmitter()
    this.cartService = cartSerevice
  }

  ngOnInit() { }
}
