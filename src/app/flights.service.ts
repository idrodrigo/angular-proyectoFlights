import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './flight.model';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  BASE_URL: string = 'http://localhost:4200/api'
  constructor(private http: HttpClient) { }

  // getFlights(): Observable<Flight[]>{
  //   return this.http.get<Flight[]>(`${this.BASE_URL}/flights`);
  // }

  getFlight(id: number): Observable<Flight>{
    return this.http.get<Flight>(`${this.BASE_URL}/flights/${id}`);
  } 

  getFlights(orig: string, dest: string): Observable<Flight[]>{
    return this.http.get<Flight[]>(`${this.BASE_URL}/flights/query/${orig}/${dest}`);
  }

  getAllFlights(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/flights`)
  }

  // postFlights(flight: Flight): Observable<Flight> {
  //   return this.http.post(`${this.BASE_URL}/flights`);
  // }

  postFlight(flight: Flight) {
    return this.http.post(`${this.BASE_URL}/flights`, flight) 
  }

  deleteFlight(id: number) {
    return this.http.post(`${this.BASE_URL}/flights/${id}/delete`, null);
  }

  getAllOrigins(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/flights/cities/origins`);
  }

  getAllDestinations(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/flights/cities/destinations`)
  }

  updateFlight(flight: Flight) {
    return this.http.post(`${this.BASE_URL}/flights/${flight.id}/update`, flight);
  }
}
