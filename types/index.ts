import { Quest, Task } from "@prisma/client";
export type QuestPost = { title: string; tasks: TaskPost[] };
export type TaskPost = {
  title: string;
  description: string;
  difficulty: string;
};
export interface PrismaQuest extends Quest {
  tasks: Task[];
}
