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

export type CreateCommentParams = {
  text: string;
  author: string;
  pinId: string;
  path: string;
};

export type CommentFormParams = {
  author: string;
  pinId: string;
  comment: [
    {
      _id: string;
      pinId: string;
      text: string;
      author: {
        _id: string;
        clerkId: string;
        username: string;
        photo: string;
      };
    }
  ];
};

export type PinCommentParams = {
  _id: string;
  pinId: string;
  text: string;
  author: {
    _id: string;
    clerkId: string;
    username: string;
    photo: string;
  };
};
