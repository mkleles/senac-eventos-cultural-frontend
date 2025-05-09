import { BrowserRouter, Routes, Route } from 'react-router';
import { ROUTES } from '../config/routes';
import HomePage from '../pages/HomePage/HomePage';
import EventsPage from '../pages/EventsPage/EventsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/UsuarioPage/RegisterPage';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.events}element={<EventsPage/>} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
