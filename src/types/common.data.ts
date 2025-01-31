export type TBlog = {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  likes: string[];
  user?: {
    fullname: string;
  };
  category: TCategory;
  slug: string;
  viewsCount: number;
  likesCount: number;
  createdAt?: string;
  comments?: TComment[];
};

export type TBlogProps = {
  post: TBlog;
  index?: number;
  deleteHandler?: (id: string) => void;
};

export type TCategory = {
  _id: string;
  title: string;
  slug: string;
};

export type TCategoryProps = {
  category: TCategory;
};

export type TComment = {
  _id: string;
  description: string;
  user: {
    initials: string;
    fullname: string;
  };
  createdAt: string;
  post: {
    title: string;
    slug: string;
  };
};

export type TCommentProps = {
  comment: TComment;
  index?: number;
  deleteHandler?: (id: string) => void;
};

export type TQuiz = {
  _id: string;
  title: string;
  description: string;
  questions: {
    questionText: string;
    options: string[];
    correctOption: string;
    explanation?: string;
  }[];
  duration: number;
  penaltyPerIncorrectAnswer: number;
  pointsRequired: number;
  tags?: string[];
  difficultyLevel: string;
  createdAt?: string;
  category?: {
    name: string;
  };
  subject?: {
    name: string;
  };
};

export type TQuizProps = {
  quiz: TQuiz;
  index?: number;
  deleteHandler?: (id: string) => void;
};

export type TQuizCategory = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  image: string;
};
export type TQuizCategoryProps = {
  category: TQuizCategory;
  setSelectedCategory?: (categoryId: string) => void;
  index?: number;
};

export interface IPackage {
  _id: string;
  title: string;
  price: number;
  offerPrice?: number;
  isOfferActive: boolean;
  points: number;
  offerStartDate?: Date;
  offerEndDate?: Date;
}


export type TPackageProps = {
  service: IPackage;
  isCheckout?: boolean;
};



export type TProgress = {
  totalCorrectAnswers: number;
  totalMarks: number;
  totalQuizzes: number;
  totalWrongAnswers: number;
};

export type TProgressProps = {
  progress: TProgress;
};


export type TMcqChapter = {
  _id: string;
  name: string;
  slug: string;
  subject: {
    _id: string;
  }
};

export type TMcqChapterProps = {
  chapter: TMcqChapter;
};

export interface IMCQ {
  _id: string;
  questions: {
    questionText: string;
    options: string[];
    correctOption: string;
    explanation?: string;
  };
  category: {
    name: string;
  };
  createdAt?: string;
}
export interface IMCQProps {
  mcq: IMCQ;
  deleteHandler?: (id: string) => void;
  isActive?: boolean;
  toggleShowDetails?: () => void;
}

export interface IQuizUserSubmission {
  _id: string;
  quiz?: {
    title: string;
  };
  user?: {
    fullname: string;
    initials: string;
    totalPoints: number;
    firstname: string;
  };
  answers?: string[];
  results?: {
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string
  };
  totalMarks?: number;
  penaltyPerIncorrectAnswer?: number;
  createdAt?: string;
}
export interface IQuizUserSubmissionProps {
  quizSubmission: IQuizUserSubmission;
  deleteHandler?: (id: string) => void;
}

export interface IFeedback {
  user: {
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
  },
  feedback: string;
  response: string;
  isResolved: boolean;
}

export interface IMCQCategory {
  _id: string;
  name: string;
  slug: string
}

export interface IMCQSubject {
  _id: string;
  name: string;
  slug: string;
  mcqCategory: {
    _id: string;
    name: string;
  }
}

export interface IMCQTopic {
  _id: string;
  name: string;
  slug: string;
  mcqSubject: {
    _id: string;
    name: string;
  }
}

export interface IQuizSubject {
  _id: string;
  name: string;
  slug: string;
  quizCategory: {
    _id: string;
    name: string;
  }
}

