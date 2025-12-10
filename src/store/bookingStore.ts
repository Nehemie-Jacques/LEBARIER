import { create } from 'zustand';

interface BookingState {
  booking: any | null;
  setBooking: (booking: any) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  booking: null,
  setBooking: (booking) => set({ booking }),
}));
