import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./ModuleReducer";
import { useSelector, useDispatch } from "react-redux";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";


import * as client from "./client";
import { useState, useEffect } from "react";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const {currentUser} = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
    console.log("the new modules:", modules);
  };

  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    console.log("new module after create is:", newModule);
    dispatch(addModule(newModule));
  };

  const removeModule = async (moduleId: string) => {
    console.log("removing module with id:", moduleId);
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  useEffect(() => {
    fetchModules();
  }, [modules.length]);

  return (
    <div id="wd-modules" className="me-4">
      {currentUser.role === "FACULTY" && (
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          createModule({ name: moduleName, description: "", course: cid, lesson: [] });
          setModuleName("");
        }}
      />)}
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray ">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      saveModule({ ...module, name: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });
                      }
                    }}
                    value={module.name}
                  />
                )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    removeModule(moduleId);
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons.map((lesson: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  {lesson.name}
                  <LessonControlButtons />
                </li>
              ))}
            </li>
          ))}
      </ul>
    </div>
  );
}
