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
  cart: string[];
}
export interface IUpdateUser {
  name?: string;
  email?: string;
  photo?: Array<File>;
}

export interface IGetSession {
  signature: string;
  data: string;
}

export interface IArtist {
  _id: string;
  user: string;
  about: string;
  avatar: {
    big: string;
    poster: string;
  };
}

export interface IArtistPost {
  _id: string;
  author: string;
  originTo: string;
  text: string;
  published: string;
  liked: string[];
  replyes: number;
}
export interface IArtistPostReply extends IArtistPost {
  replyTo: string;
}
export interface IArtistPostGetPayload {
  authorId: string;
  currentPage: number;
}
export interface IArtistPostReplyGetPayload {
  postId: string;
  currentPage: number;
}
export interface IArtistPostReplyToReplyGetPayload {
  replyId: string;
  currentPage: number;
}
export interface IArtistPostGetResponse {
  artistPosts: IArtistPost[];
  totalCount: number;
}
export interface IArtistPostReplyGetResponse {
  artistPostsReplyes: IArtistPostReply[];
  totalCount: number;
}

export interface IArtistPostReplyPostPayload {
  postId: string;
  text: string;
  replyTo?: string;
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

export interface IMusicComment {
  _id: string;
  author: string;
  originTo: string;
  text: string;
  published: string;
  liked: string[];
  timestamp?: number;
}
export type IMusicCommentBody = Pick<
  IMusicComment,
  "text" | "timestamp" | "originTo"
>;
export interface IMusicCommentResponse {
  musicComments: IMusicComment[];
  totalCount: number;
}
export interface IMusicCommentGetPayload {
  currentPage: number;
  currentSong: string;
}
export interface IMusicInfo {
  _id: string;
  authorId: string;
  title: string;
  genre: string;
  price: number;
  listenings: number;
  published: string;
  image: string;
}
export interface IMusics {
  musics: Array<IMusicInfo>;
  totalCount: number;
}
export interface IMusicInfoBody {
  author: string;
  genre: string;
  priceFrom: number;
  priceTo: number;
  currentPage: number;
}
export interface IError {
  status: number;
  data: {
    message: string;
  };
}
