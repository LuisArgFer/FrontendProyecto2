import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";

import { AuthProvider } from "./context/AuthProvider";
import { CategoriesProvider } from "./context/CategoriesProvider";
import Noticias from "./paginas/Noticias";
import Perfil from "./paginas/Perfil";
import NewSourse from "./paginas/NewSourse";
import NewsNewsSourse from "./paginas/NewsNewsSource";
import { NoticiasProvider } from "./context/NoticiasProvider";
import EditarNewSourse from "./paginas/EditarNewSourse";
import FA2 from "./paginas/FA2";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NoticiasProvider>
          <CategoriesProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/login/2fa" element={<FA2 />} />
                <Route path="registrarse" element={<Registrar />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route
                  path="olvide-password/:token"
                  element={<NuevoPassword />}
                />
                <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              </Route>

              <Route path="/dashboard" element={<RutaProtegida />}>
                <Route index element={<Noticias />} />
                <Route path="categorias/:id" element={<Noticias />} />
                <Route path="newsourse" element={<NewSourse />} />
                <Route path="newsourse/new" element={<NewsNewsSourse />} />
                <Route path="newsourse/editar/:id" element={<EditarNewSourse />} />
                <Route path="perfil" element={<Perfil />} />
              </Route>
            </Routes>
          </CategoriesProvider>
        </NoticiasProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
