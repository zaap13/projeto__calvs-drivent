import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createBooking, getBooking, updateBooking } from '@/controllers';
import { createBookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .use(validateBody(createBookingSchema))
  .post('/', createBooking)
  .put('/:bookingId', updateBooking);

export { bookingRouter };
