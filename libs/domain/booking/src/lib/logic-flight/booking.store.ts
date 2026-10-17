import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { Flight } from './model/flight';
import { FlightFilter } from './model/flight-filter';
import { linkedSignal } from '@angular/core';

export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState({
    filter: {
      from: 'Hamburg',
      to: 'Graz',
      urgent: false
    },
    basket: {
      3: true,
      5: true,
    } as Record<number, boolean>,
    _flights: [] as Flight[]
  }),
  withComputed(store => ({
    delayed: () => store._flights().filter(flight => flight.delayed),
  })),
  withMethods(store => ({
    setFilter: (filter: FlightFilter) => patchState(store, { filter }),
    setFlights: (_flights: Flight[]) => patchState(store, { _flights }),
  })),
  withProps(store => ({
    flights: linkedSignal(
      store._flights,
      { set: store.setFlights }
    )
  }))
);