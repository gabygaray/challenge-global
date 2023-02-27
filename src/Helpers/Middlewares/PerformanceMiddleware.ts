import { Injectable, NestMiddleware } from '@nestjs/common';
import * as logger from 'better-console-log-plus';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PerformanceMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const startTime = performance.now();
        const startUsage = process.cpuUsage();

        res.on('finish', () => {
            const endTime = performance.now();
            const endUsage = process.cpuUsage(startUsage);
            const duration = (endTime - startTime).toFixed(2);
            const userCpuUsage = (endUsage.user / 1000).toFixed(2);
            const systemCpuUsage = (endUsage.system / 1000).toFixed(2);
            const { path } = req;

            logger.debug(
                `USO - TIEMPO para path: \u001b[32m${path}\u001b[0m. Usuario ${userCpuUsage} µs, Sistema ${systemCpuUsage} µs, TDP: \u001b[33m+${duration} ms\u001b[33m`,
            );
        });

        next();
    }
}
