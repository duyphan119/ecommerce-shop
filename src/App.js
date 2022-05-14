import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./components/Layouts";
import { publicRoutes } from "./routes";
import Toastify from "./components/Common/Toastify";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((router, index) => {
            let Layout = DefaultLayout;
            let Page = router.component;
            if (router.layout) {
              Layout = router.layout;
            }
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
      <Toastify />
    </>
  );
}

export default App;
