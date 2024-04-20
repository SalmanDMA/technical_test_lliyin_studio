import { IProsRoutesNavtab, ITableLatestBooking, ITableReservation } from '@/types/dashboard';

const routesNavtab: IProsRoutesNavtab[] = [
  {
    title: 'Departure',
    bandage: false,
    points: null,
  },
  {
    title: 'Arrival',
    bandage: true,
    points: 1,
  },
  {
    title: 'Stay-over',
    bandage: false,
    points: null,
  },
];

// Dummy Data
const tableReservation: ITableReservation[] = [
  {
    id: 1,
    imageSrc: '/images/guy-hawkins.svg',
    title: 'Guy Hawkins',
    code: '#12029283',
    nights: 1,
    bedrooms: 5,
    date: '31 October',
    dateRange: '7 Des 2021 - 8 Des 2021',
    arrivalTime: '1:00 PM - 1:00 PM',
    price: 100.0,
  },
  {
    id: 2,
    imageSrc: '/images/annette-black.svg',
    title: 'Annette Black',
    code: '#12029283',
    nights: 1,
    bedrooms: 5,
    date: '31 October',
    dateRange: '7 Des 2021 - 8 Des 2021',
    arrivalTime: '1:00 PM - 1:00 PM',
    price: 100.0,
  },
  {
    id: 3,
    imageSrc: '/images/eleanor-pena.svg',
    title: 'Eleanor Pena',
    code: '#12029283',
    nights: 1,
    bedrooms: 5,
    date: '31 October',
    dateRange: '7 Des 2021 - 8 Des 2021',
    arrivalTime: '1:00 PM - 1:00 PM',
    price: 100.0,
  },
];

const tableLatestBooking: ITableLatestBooking[] = [
  {
    id: 1,
    imageSrc: '/images/kristin-watson.svg',
    title: 'Kristin Watson',
    nights: 1,
    bedrooms: 5,
    checkInDate: '8 Des 2021',
    checkOutDate: '8 Des 2021',
    status: 'Confirmed',
  },
  {
    id: 2,
    imageSrc: '/images/arlene-mcCoy.svg',
    title: 'Arlene McCoy',
    nights: 1,
    bedrooms: 5,
    checkInDate: '8 Des 2021',
    checkOutDate: '8 Des 2021',
    status: 'Confirmed',
  },
];

export { routesNavtab, tableReservation, tableLatestBooking };
