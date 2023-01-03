interface DataType {
  message: string;
  token: string;
}

type ResponseType = {
  data: DataType;
};

export type { ResponseType };
