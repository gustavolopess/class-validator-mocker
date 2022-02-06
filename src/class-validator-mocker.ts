import 'reflect-metadata';

import {randomBytes, randomInt, randomUUID} from 'crypto';
import {getMetadataStorage, IS_BOOLEAN, IS_NUMBER, IS_STRING, IS_UUID} from 'class-validator';
import {ValidationMetadata} from 'class-validator/types/metadata/ValidationMetadata';

type AvailableTypes = string | number | boolean | undefined;

export class ClassValidatorMocker {
	public static create<T>(constructor: Function, partial: Partial<T> = {}): T {
		return new ClassValidatorMocker().create(constructor, partial);
	}

	public create<T>(constructor: Function, partial: Partial<T> = {}): T {
		const metadataStorage = getMetadataStorage();
		const targetMetadatas = metadataStorage.getTargetValidationMetadatas(
			constructor,
			'',
			false,
			false,
		);
		const groupedMetadatas = metadataStorage.groupByPropertyName(targetMetadatas);

		let randomFixture = {} as T;

		for (const propertyName of Object.keys(groupedMetadatas)) {
			const metadatas = groupedMetadatas[propertyName];
			const value = this.generatePropertyValueFromMetadatas(metadatas);

			if (value !== undefined) {
				randomFixture = {
					...randomFixture,
					[propertyName]: value,
				}
			}
		}

		return {...randomFixture, ...partial};
	}

	private generatePropertyValueFromMetadatas(metadatas: ValidationMetadata[]): AvailableTypes {
		for (const metadata of metadatas) {
			const constraints = getMetadataStorage().getTargetValidatorConstraints(
				metadata.constraintCls,
			);

			for (const constraint of constraints) {
				switch (constraint.name) {
					case IS_STRING:
						return this.randomString();
					case IS_NUMBER:
						return this.randomNumber();
					case IS_BOOLEAN:
						return this.randomBoolean();
					case IS_UUID:
						return randomUUID();
					default:
						break;
				}
			}
		}

		return undefined;
	}

	private randomString(): string {
		return randomBytes(randomInt(1, 10)).toString('hex');
	}

	private randomNumber(): number {
		return randomInt(0, 99_999);
	}

	private randomBoolean(): boolean {
		return randomInt(0, 1) === 1;
	}
}
