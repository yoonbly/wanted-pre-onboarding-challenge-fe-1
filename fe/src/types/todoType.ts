import { Dispatch, SetStateAction } from "react";

interface TodoCreateType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

type Todo = {
  title: string;
  content: string;
};

interface Todos {
  content: string;
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type { TodoCreateType, Todo, Todos };
