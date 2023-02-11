import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';
import { listHotels } from '../hotels-service';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);

  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await listHotels(userId);

  await bookingRepository.createBooking(userId, roomId);
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  await listHotels(userId);

  await bookingRepository.updateBooking(userId, roomId, bookingId);
}

const bookingervice = {
  getBooking,
  createBooking,
  updateBooking,
};

export default bookingervice;
