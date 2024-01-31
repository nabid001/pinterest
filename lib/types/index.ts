export type CreatePinParams = {
  title: string;
  description?: string;
  link?: string;
  tag?: string;
  image: string;
  author: string;
};

export type PinParams = {
  _id: string;
  image: string;
  title: string;
  description?: string;
  link?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo: string;
  };
  comments: {
    pinId: string;
    text: string;
    author: {
      _id: string;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      photo: string;
    };
  };
};
