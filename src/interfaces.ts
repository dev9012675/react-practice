export interface IPost {
  title: string;
  content: string;
  owner_id: number;
  id: number;
  files: string;
  published?: boolean;
}

export interface ICreatePost {
  title: string;
  content: string;
  published: boolean;
  audioFiles: object;
}

export interface IFile {
  name: string;
  path: string;
}

export interface IMenu {
  title: string;
  setAttribute: React.Dispatch<React.SetStateAction<unknown>>;
  elements: string[] | IFile[];
}

export interface IMediaRecorder {
  attribute: string;
  setAttribute: React.Dispatch<React.SetStateAction<unknown>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<unknown>>;
  setOpen: React.Dispatch<React.SetStateAction<unknown>>;
}

export interface IUser {
  access_token: string;
  token_type: string;
  email: string;
  id: number;
}
