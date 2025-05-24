import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from '../config/routes';
import EventsPage from '../pages/EventsPage/EventsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import MeusEventos from '../pages/MeusEventos/MeusEventos';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import HomePage from '../pages/HomePage/HomePage';
import CreateEventsPage from '../pages/CreateEventsPage/CreateEventsPage';


const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.events} element={<EventsPage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.meuseventos} element={<MeusEventos />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
            <Route path={ROUTES.create_events} element={<CreateEventsPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
