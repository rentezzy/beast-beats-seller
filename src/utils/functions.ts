import { IArtist, ILoginUser, Roles } from "../types/api.types";

export const defaultUser = (data: ILoginUser | undefined) => {
  let _id = "";
  let small = `${process.env.REACT_APP_MAIN_API}images/img/default.png`;
  let big = `${process.env.REACT_APP_MAIN_API}images/img/default.png`;
  let email = "user@gmail.com";
  let name = "user";
  let username = "username";
  let role: Roles = "user";

  if (!data) return { _id, email, name, username, role, small, big };

  if (data.avatar !== "/default") {
    small = `${process.env.REACT_APP_MAIN_API}images/img/${data._id}/${data.avatar}-small.png`;
    big = `${process.env.REACT_APP_MAIN_API}images/img/${data._id}/${data.avatar}-big.png`;
  }
  if (data._id !== _id) {
    _id = data._id;
  }
  if (data.email !== email) {
    email = data.email;
  }
  if (data.name !== name) {
    name = data.name;
  }
  if (data.username !== username) {
    username = data.username;
  }
  if (data.role !== role) {
    role = data.role;
  }
  return { _id, email, name, username, role, small, big };
};

export const defaultArtist = (data: IArtist | undefined) => {
  let _id = "";
  let user = "";
  let big = `${process.env.REACT_APP_MAIN_API}images/artists/big/defaultBig.jpg`;
  let poster = `${process.env.REACT_APP_MAIN_API}images/artists/poster/defaultPoster.jpg`;
  let about = "About me.";

  if (!data) return { _id, about, user, poster, big };

  if (data._id !== _id) {
    _id = data._id;
  }
  if (data.user !== user) {
    user = data.user;
  }
  if (data.about !== about) {
    about = data.about;
  }
  if (
    big !==
    `${process.env.REACT_APP_MAIN_API}images/artists/big/${data.avatar.big}`
  ) {
    big = `${process.env.REACT_APP_MAIN_API}images/artists/big/${data.avatar.big}`;
  }
  if (
    poster !==
    `${process.env.REACT_APP_MAIN_API}images/artists/poster/${data.avatar.poster}`
  ) {
    poster = `${process.env.REACT_APP_MAIN_API}images/artists/poster/${data.avatar.poster}`;
  }

  return { _id, about, user, poster, big };
};
