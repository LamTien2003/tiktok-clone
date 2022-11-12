import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Upload from '@/pages/Upload';
import Profile from '@/pages/Profile';
import Live from '@/pages/Live';
import { HeaderOnly, FullScreenLayout } from '@/layouts';
import config from '@/config';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile, layout: FullScreenLayout },
    { path: config.routes.live, component: Live },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: '/null', component: Upload, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
