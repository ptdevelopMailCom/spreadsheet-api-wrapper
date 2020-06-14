import { Router } from "express";

export default interface IControllerBase {
    router: Router;
    initializeRoutes(): void
}