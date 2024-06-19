import "./styles.css";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
// import * as db from "./Database";
import * as client from "./Courses/client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";
import Session from "./Account/Session";
import ProtectedRoute from "./ProtectedRoute";
import RegisterCourses from "./Dashboard/RegisterCourses";
import { setCurrentUser } from "./Account/reducer";

export default function Kanbas() {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    department: "New Department",
    credits: 4,
  });

  const addNewCourse = async () => {
    try {
      // First create the course
      const newCourse = await client.createCourse(course);
      console.log("newCourse", newCourse);


      //Then add the course for the faculty
      const response = await client.registerCourse(currentUser._id, newCourse._id);
      console.log("response", response);
      setCourses([...courses, newCourse]);

      // Update the currentuser in the store
      const newUserCourses = [...currentUser.enrolledCourses, response];
      const newCurrentUser = { ...currentUser, enrolledCourses: newUserCourses };
      dispatch(setCurrentUser(newCurrentUser));
      setErrorMessage("");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Invalid course data. Avoid duplicate course Name and number.");
      }
    }
  };

  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
    const newUserCourses = currentUser.enrolledCourses.filter((c: any) => c.courseId !== courseId);
    const newCurrentUser = { ...currentUser, enrolledCourses: newUserCourses };
    dispatch(setCurrentUser(newCurrentUser));

  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  
    const newUserCourses = currentUser.enrolledCourses.map((c: any) => { 
      return c.courseId === course._id ? course : c 
    });
    const newCurrentUser = { ...currentUser, enrolledCourses: newUserCourses };
    dispatch(setCurrentUser(newCurrentUser));

  };

  return (
    <Provider store={store}>
      <Session>
        <div id="wd-kanbas" className="h-100">
          <div className="d-flex h-100">
            <div className="d-none d-md-block bg-black">
              <KanbasNavigation />
            </div>
            <div className="flex-fill p-4 ps-5 ">
              <Routes>
                <Route path="/" element={<Navigate to="Dashboard" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route
                  path="/AllCourses"
                  element={<RegisterCourses courses={courses} />}
                />
                <Route
                  path="Dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard
                        courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addNewCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse}
                        errorMessage={errorMessage}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Courses/:cid/*"
                  element={
                    <ProtectedRoute>
                      <Courses courses={courses} />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="Courses/:cid/*" element={<Courses />} /> */}
                <Route path="Calendar" element={<h1>Calendar</h1>} />
                <Route path="Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      </Session>
    </Provider>
  );
}
