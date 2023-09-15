import { Quest, Task } from "@prisma/client";
import { Deck } from "@prisma/client";
export type QuestPost = { title: string; tasks: TaskPost[] };
export type TaskPost = {
  title: string;
  description: string;
  difficulty: string;
};
export interface PrismaQuest extends Quest {
  tasks: Task[];
}
export interface PrismaDeck extends Deck {
  tags: {name:string}[];
}
export interface PostDeck extends Deck {
  tags: string[];
}
