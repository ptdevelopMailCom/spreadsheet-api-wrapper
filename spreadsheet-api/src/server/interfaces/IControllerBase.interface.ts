import { Router } from "express";

export default interface IControllerBase {
    initializeRoutes(): void
}