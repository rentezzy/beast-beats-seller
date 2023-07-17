export type Roles = "user" | "artist" | "publisher" | "moderator" | "admin";

export interface IAppInfo {
  ticker: string;
  genres: string[];
  maxPrice: number;
}

// API
export interface IError {
  status: number;
  data: {
    message: string;
  };
}

interface IDBModel {
  _id: string;
}
interface IDBPost extends IDBModel {
  text: string;
  published: string;
  liked: string[];
}

// USER

export interface ILoginUser extends IDBModel {
  username: string;
  name: string;
  email: string;
  avatar: string;
  role: Roles;
  cart: string[];
}

export interface ILoginBody {
  username: string;
  password: string;
}
export interface ISignupBody extends ILoginBody {
  name: string;
  email: string;
  passwordConfirm: string;
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

export interface IPasswordBody {
  password: string;
  passwordConfirm: string;
  passwordCurrent: string;
}

// ARTIST

export interface IArtist extends IDBModel {
  user: string;
  about: string;
  avatar: {
    big: string;
    poster: string;
  };
}

export interface IArtistPost extends IDBPost {
  originTo: string;
  replyes: number;
  author: string;
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

// NEWS
export interface INewsPost extends IDBPost {
  authorUsername: string;
  title: string;
}

export interface INewsPosts {
  newsPosts: Array<INewsPost>;
  totalCount: number;
}

//MUSIC
export interface IMusicInfo extends IDBModel {
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
export interface IMusicComment extends IDBPost {
  author: string;
  originTo: string;
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
