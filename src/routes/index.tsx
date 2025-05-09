import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from '../config/routes';
import EventsPage from '../pages/EventsPage/EventsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MeusEventos from '../pages/MeusEventos/MeusEventos';
import RegistroPage from '../pages/RegistroPage/RegistroPage';


const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={ROUTES.events} element={<EventsPage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.meuseventos} element={<MeusEventos />} />
            <Route path={ROUTES.registro} element={<RegistroPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
