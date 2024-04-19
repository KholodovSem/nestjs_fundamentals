import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

/* 
    *Middleware called before a route handler
    !It can also be configured to be called
    !after the route handler executes the logic,
    !but before the response is sent. 


    Middleware can:
    - Perform any operations 
    - Access and make changes to the request and response object
    - Call the next middleware function in the stack
    - End the request-response cycle

    !Note that you must call next() function if you
    !want to pass control to the next middleware
*/

@Injectable()
export class CoffeeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request: ", req);

    next();
  }
}
