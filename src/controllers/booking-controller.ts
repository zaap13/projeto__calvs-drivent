import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { roomId } = req.body;

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const booking = await bookingService.createBooking(userId, roomId);

    return res.status(httpStatus.CREATED).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
