import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
export default function Kanbas() {
    return (
      <div id="wd-kanbas">
        <table>
          <tr>
            <td valign="top">
              <KanbasNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route path="/" element={<Navigate to="Dashboard" />} />
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Courses/:id/*" element={<Courses />} />
              </Routes>
            </td>
          </tr>
        </table>
      </div>
  );}
  
