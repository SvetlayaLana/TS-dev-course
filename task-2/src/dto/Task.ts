import { z } from "zod";

export enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
}

export enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export const schema = z.object({
    id: z.string().or(z.number()),
    title: z.string(),
    description: z.string().optional(),
    createdAt: z.string().or(z.date()),
    status: z.enum(Status).optional(),
    priority: z.enum(Priority).optional(),
    deadline: z.string().or(z.date()),
})

export type Task = z.infer<typeof schema>;
