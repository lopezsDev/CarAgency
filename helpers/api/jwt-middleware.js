import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate',
            '/api/users',
            { url: /^\/api\/cars\/*/, methods: ['GET', 'PUT', 'DELETE', 'PUT', 'PATCH'] }, 

        ]
    });

    return util.promisify(middleware)(req, res);
}