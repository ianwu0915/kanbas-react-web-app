export default function Dashboard() {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
        <div id="wd-dashboard-courses">
          <div className="wd-dashboard-course">
            <img src="/images/webdev.png" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5610 Web Development
              </a>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
          <div className="wd-dashboard-course">
            <img src="/images/algo.png" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5800 Algorithm
              </a>
              <p className="wd-dashboard-course-title">
                Data structure and algorithm
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
          <div className="wd-dashboard-course">
            <img src="/images/cloud.png" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5710 Cloud Computing
              </a>
              <p className="wd-dashboard-course-title">
                Cloud computing and storage
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
          <div className="wd-dashboard-course">
            <img src="/images/mobile-app.png" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5520 Mobile App Development
              </a>
              <p className="wd-dashboard-course-title">
                Android and iOS app development
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
          <div className="wd-dashboard-course">
            <img src="/images/sysdesign.png" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5310 System Design 
              </a>
              <p className="wd-dashboard-course-title">
                System design and architecture
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
          <div className="wd-dashboard-course">
            <img src="/images/python.png" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5001 Python Programming
              </a>
              <p className="wd-dashboard-course-title">
                Python programming language
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
          <div className="wd-dashboard-course">
            <img src="/images/ood.png" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS5004 Object Oriented Programming
              </a>
              <p className="wd-dashboard-course-title">
                Object oriented programming
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
          
        </div>
      </div>
  );}
  