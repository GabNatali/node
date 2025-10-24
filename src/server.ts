import  express, { Router } from "express"
import cors from 'cors';

export interface Options {
    port: number;
    routes: Router;
    corsOrigins: string[];
}

export class Server {
    private readonly app = express();

    private readonly port: number;
    private readonly corsOrigins: string[];
    private readonly routes: Router;
    constructor(private readonly options: Options) {

        const { port, routes, corsOrigins } = options;

        this.port = port;
        this.corsOrigins = corsOrigins;
        this.routes = routes;

    }
    start() {

        this.app.use(cors({
                origin: this.corsOrigins,
                credentials: true,
            }),
        );

        this.app.use(express.json());

        this.app.use( this.routes );

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });


    }
}

