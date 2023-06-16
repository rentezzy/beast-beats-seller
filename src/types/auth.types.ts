export interface ILoginBody {
  username: string;
  password: string;
}
export interface ISignupBody {
  email: string;
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface ILoginUser {
  avatar: string;
  email: string;
  name: string;
  role: string;
  username: string;
  _id: string;
}

export interface IAppInfo {
  ticker: string;
}

export interface INewsPost {
  authorUsername: string;
  title: string;
  text: string;
  published: string;
  liked: [String];
}

export interface IError {
  status: number;
  data: {
    message: string;
  };
}
