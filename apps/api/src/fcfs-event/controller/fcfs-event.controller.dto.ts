import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const PickRandomSchema = z.object({
  purchasingQuantity: z.number().min(1).max(10),
});
export class PickRandomDto extends createZodDto(PickRandomSchema) {}
