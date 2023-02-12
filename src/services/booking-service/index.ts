import bookingRepository from '@/repositories/booking-repository';
import { fullRoomError, notFoundError } from '@/errors';
import { listHotels } from '../hotels-service';
import hotelRepository from '@/repositories/hotel-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);

  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  await listHotels(userId);

  const room = await hotelRepository.getRoom(roomId);
  if (!room) {
    throw notFoundError();
  }

  const check = await bookingRepository.findBookingByRoomId(roomId);

  if (check.length >= room.capacity) {
    throw fullRoomError();
  }

  await bookingRepository.createBooking(userId, roomId);
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  await listHotels(userId);

  const room = await hotelRepository.getRoom(roomId);
  if (!room) {
    throw notFoundError();
  }

  const check = await bookingRepository.findBookingByRoomId(roomId);

  if (check.length >= room.capacity) {
    throw fullRoomError();
  }

  await bookingRepository.updateBooking(userId, roomId, bookingId);
}

const bookingervice = {
  getBooking,
  createBooking,
  updateBooking,
};

export default bookingervice;
