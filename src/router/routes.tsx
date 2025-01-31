import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/Client/MainLayout";
import HomePage from "../pages/Client/Home";
import LoginPage from "../pages/Client/Login";
import RegisterPage from "../pages/Client/Register";
import ProtectedRoute from "@/layout/ProtectedRoute";
import DHomePage from "@/pages/Dashboard/DHome";
import AdminDashboardLayout from "@/layout/Dashboard/Admin/AdminDashboardLayout";
import UserDashboardLayout from "@/layout/Dashboard/User/UserDashboardLayout";
import QuizPage from "@/pages/Client/Quiz/Quiz";
import PricePlanPage from "@/pages/Client/PricePlan";
import QuizDetails from "@/pages/Client/Quiz/QuizDetails";
import QuizSubmissionPage from "@/pages/Client/Quiz/QuizSubmission";
import { AllQuizPage } from "@/pages/Dashboard/Admin/Quiz/Quiz";
import { CreateQuizPage } from "@/pages/Dashboard/Admin/Quiz/CreateQuiz";
import { CreateQuizCategoryPage } from "@/pages/Dashboard/Admin/Quiz/CreateCategory";
import { AllQuizCategoryPage } from "@/pages/Dashboard/Admin/Quiz/Category";
import UserPage from "@/pages/Dashboard/Admin/User";
import ProfilePage from "@/pages/Dashboard/Admin/Profile";
import ChangePasswordPage from "@/pages/Dashboard/Admin/ChangePassword";
import UHomePage from "@/pages/Dashboard/UHome";
import PlanPage from "@/pages/Dashboard/Admin/Plan/Plan";
import CreatePlanPage from "@/pages/Dashboard/Admin/Plan/CreatePlan";
import CheckoutPage from "@/pages/Client/Checkout";
import SubscribePage from "@/pages/Dashboard/Admin/Plan/Subscribe";
import UQuizPage from "@/pages/Dashboard/User/Quiz/UQuiz";
import NotFoundPage from "@/pages/Client/NotFound/NotFound";
import MySubmissionsPage from "@/pages/Dashboard/Admin/MySubmissions";
import { AllMcqPage } from "@/pages/Dashboard/Admin/Mcq/Mcq";
import { CreateMcqPage } from "@/pages/Dashboard/Admin/Mcq/CreateMcq";
import MCQPage from "@/pages/Client/MCQ/MCQ";
import SubmissionPage from "@/pages/Dashboard/Admin/Submission/Submission";
import FeedbackPage from "@/pages/Dashboard/User/Feedback/Feedback";
import AdminFeedbackPage from "@/pages/Dashboard/Admin/Feedback/Feedback";
import { AddCategoryPage } from "@/pages/Dashboard/Admin/Mcq/AddCategory";
import { AddSubjectPage } from "@/pages/Dashboard/Admin/Mcq/AddSubject";
import { AddTopicPage } from "@/pages/Dashboard/Admin/Mcq/AddTopic";
import { AddQuizSubjectPage } from "@/pages/Dashboard/Admin/Quiz/AddSubject";



export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/quiz/quiz-details/:id",
        element: <QuizDetails />,
      },
      {
        path: "/quiz/quiz-submission/:id",
        element: <QuizSubmissionPage />,
      },
      {
        path: "/mcq",
        element: <MCQPage />,
      },
      {
        path: "/exam",
        element: <QuizPage />,
      },
      {
        path: "/price-plan",
        element: <PricePlanPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <DHomePage />,
      },
      {
        path: "my-submissions",
        element: <MySubmissionsPage />,
      },
      {
        path: "all-exam",
        element: <AllQuizPage />,
      },
      {
        path: "create-exam",
        element: <CreateQuizPage />,
      },
      {
        path: "create-exam/:id",
        element: <CreateQuizPage />,
      },
      {
        path: "create-exam-category",
        element: <CreateQuizCategoryPage />,
      },
      {
        path: "create-exam-category/:id",
        element: <CreateQuizCategoryPage />,
      },
      {
        path: "exam-category",
        element: <AllQuizCategoryPage />,
      },
      {
        path: "exam-topic",
        element: <AddQuizSubjectPage />,
      },
      {
        path: "all-mcq",
        element: <AllMcqPage />,
      },
      {
        path: "create-mcq",
        element: <CreateMcqPage />,
      },
      {
        path: "create-mcq/:id",
        element: <CreateMcqPage />,
      },
      {
        path: "mcq-category",
        element: <AddCategoryPage />,
      },
      {
        path: "mcq-subject",
        element: <AddSubjectPage />,
      },
      {
        path: "mcq-topic",
        element: <AddTopicPage />,
      },
      {
        path: "all-user",
        element: <UserPage />,
      },
      {
        path: "all-feedback",
        element: <AdminFeedbackPage/>,
      },
      {
        path: "package",
        element: <PlanPage />,
      },
      {
        path: "create-package",
        element: <CreatePlanPage />,
      },
      {
        path: "subscriber",
        element: <SubscribePage />,
      },
      {
        path: "create-package/:id",
        element: <CreatePlanPage />,
      },
      {
        path: "submission",
        element: <SubmissionPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
    ],
  },

  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute role="user">
        <UserDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/user/dashboard",
        element: <UHomePage />,
      },
      {
        path: "all-mcq",
        element: <AllMcqPage />,
      },
      {
        path: "quiz",
        element: <UQuizPage />,
      },
      {
        path: "feedback",
        element: <FeedbackPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
