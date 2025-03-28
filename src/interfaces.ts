export interface IPost {
  title: string;
  content: string;
  owner_id: number;
  id: number;
  files: string;
  published?: boolean;
}
