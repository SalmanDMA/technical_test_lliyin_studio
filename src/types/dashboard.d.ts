export interface IProsRoutesNavtab {
  title: string;
  bandage: boolean;
  points: number | null;
}

export interface ITableReservation {
  id: number;
  imageSrc: string;
  title: string;
  code: string;
  nights: number;
  bedrooms: number;
  date: string;
  dateRange: string;
  arrivalTime: string;
  price: number;
}

export interface ITableLatestBooking {
  id: number;
  imageSrc: string;
  title: string;
  nights: number;
  bedrooms: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}
