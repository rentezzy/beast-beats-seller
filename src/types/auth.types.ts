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
  _id: string;
  username: string;
  avatar: string;
  email: string;
  name: string;
  role: string;
}

export interface IAppInfo {
  ticker: string;
  genres: string[];
  maxPrice: number;
}

export interface INewsPost {
  _id: string;
  authorUsername: string;
  title: string;
  text: string;
  published: string;
  liked: string[];
}

export interface INewsPosts {
  newsPosts: Array<INewsPost>;
  totalCount: number;
}

export interface IError {
  status: number;
  data: {
    message: string;
  };
}
