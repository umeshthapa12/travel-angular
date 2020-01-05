import { Injectable } from '@angular/core';
import { Tour } from 'src/app/tour';
import { Observable, of, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private tours: Tour[]
  private database: AngularFirestore

  constructor(database: AngularFirestore) {
    this.database = database
    this.tours = []
  }

  getTours(): Observable<Tour[]> {
    return this.database.collection('tours').snapshotChanges().pipe (
      map ( data => { 
        return data.map( data => {
          var tour = data.payload.doc.data() as Tour
          const mapedTerms = tour.terms.map( term => {
            const startDate = new Date(term.startDate.seconds * 1000)
            const endDate = new Date(term.endDate.seconds * 1000)
            term.startDate = startDate
            term.endDate = endDate
            return term
          })
          tour.terms = mapedTerms
          tour.id =  data.payload.doc.id
          return tour
        })
      })
    )
  }

  getTour(id: string): Observable<Tour> {
    return this.database.doc('tours/' + id).get().pipe (
      map ( doc => { 
        var tour = doc.data() as Tour
        const mapedTerms = tour.terms.map( term => {
          const startDate = new Date(term.startDate.seconds * 1000)
          const endDate = new Date(term.endDate.seconds * 1000)
          term.startDate = startDate
          term.endDate = endDate
          return term
        })
        tour.terms = mapedTerms
        tour.id =  id
        return tour
      })
    )
  }

  addTour(tour: any) {
    this.database.collection('tours').add(tour)
    .then( val => {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  deleteTour(tour: Tour) {
    const index = this.tours.indexOf(tour, 0)
    if (index > -1) {
      this.tours.splice(index, 1)
    }
  }
}