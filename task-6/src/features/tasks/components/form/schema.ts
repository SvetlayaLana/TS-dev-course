import { z } from 'zod';
import { Status, Priority } from '../../types';
import { parseDate } from '../../../../shared/utils';

export const createFormSchema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().optional(),
  status: z.enum(Status, 'Required'),
  priority: z.enum(Priority, 'Required'),
  deadline: z
    .string()
    .min(1, 'Required')
    .refine(
      (val) => {
        const date = parseDate(val);

        if (!date) {
          return false;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return date >= today;
      },
      {
        error: 'Date cannot be in the past',
      },
    ),
});

export type CreateFormSchema = z.infer<typeof createFormSchema>;
