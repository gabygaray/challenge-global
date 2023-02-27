import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateRequiredPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            const message = metadata.data ? `The ${metadata.type} '${metadata.data}' is required` : `Validation failed (numeric string is expected)`;
            throw new BadRequestException(message);
        }

        return value;
    }
}
