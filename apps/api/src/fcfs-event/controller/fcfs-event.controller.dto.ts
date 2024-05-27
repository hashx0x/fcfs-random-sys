import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const PickRandomSchema = z.object({
  eventId: z.string(),
  purchasingQuantity: z.number().min(1).max(10),
});
export class PickRandomDto extends createZodDto(PickRandomSchema) {}
