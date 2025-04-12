
import { z } from 'zod';

export const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email required"),
    password: z.string().min(6, "Password must be at least 6 characters")
  });
  