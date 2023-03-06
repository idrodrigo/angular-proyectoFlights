import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private flighService: FlightsService) {}

  origin: string;
  destination: string;
  fnumber: number;
  depart: Date;
  arrive: Date;
  nonstop: boolean = false;
  
  flightList: any[];
  loading=true;

  ngOnInit(): void {
      // this.flighService.getAllFlights().subscribe(data=>{
      //   this.flightList=data;
        
      // })
      this.refresh();
  }

  refresh(){
    this.flighService.getAllFlights().subscribe(data=>{
      this.flightList=data;
      this.loading=false;
    })
  }

  toggleNonStop(){
    this.nonstop = !this.nonstop;
  }

  sendFlight(){
    const flight: Flight = {
    origin: this.origin,
    destination: this.origin,
    fnumber: this.fnumber,
    depart: this.depart,
    arrive: this.arrive,
    nonstop: this.nonstop 
    }
    console.log(flight);
    this.flighService.postFlight(flight).subscribe(data=>{
        if(data && data['origin']){
          this.refresh();
        }
    });
  }

  update(flight: Flight){
    //console.log(`This is what our new flight will looke like`, flight)
    if (window.confirm('are you sure you want to uptade this flight? ')){
    this.flighService.updateFlight(flight)
    .subscribe(data=>{
      if(data && data['affected']){
        this.refresh();
      }
    });
   }
  }

  delete(flight:Flight){
    if (window.confirm('are you sure you want to delete this flight? ')){
      this.flighService.deleteFlight(flight.id).subscribe(data =>{
        if(data && data['affected']){
          this.refresh();
        }
      });
    }
  }
}
