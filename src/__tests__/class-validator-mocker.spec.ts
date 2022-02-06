import {IsString, IsNumber, IsBoolean, IsUUID} from 'class-validator';
import {ClassValidatorMocker} from '../class-validator-mocker';

class TestClazz {
	@IsString()
	public str: string;

	@IsNumber()
	public num: number;

	@IsBoolean()
	public bool: boolean;

	@IsUUID()
	public uuid: string;
}

describe('ClassValidatorMock', () => {
	describe('#create', () => {
		let mock: TestClazz;
		let mockWithPartial: TestClazz;

		beforeAll(() => {
			mock = ClassValidatorMocker.create<TestClazz>(TestClazz);
			mockWithPartial = ClassValidatorMocker.create<TestClazz>(TestClazz, {
				str: 'test',
				num: 1,
			});
		});

		it('should create a random object', () => {
			const mock = ClassValidatorMocker.create<TestClazz>(TestClazz);
			expect(typeof mock).toBe('object');
		});

		it('should create an object with corret types for each field based on decorators', () => {
			expect(typeof mock.str).toBe('string');
			expect(typeof mock.num).toBe('number');
			expect(typeof mock.bool).toBe('boolean');
			expect(typeof mock.uuid).toBe('string');
		});

		it('should not create any empty field', () => {
			expect(mock.str).not.toBe('');
			expect(mock.num).not.toBe(0);
			expect(mock.bool).not.toBeUndefined();
			expect(mock.uuid).not.toBe('');
		});

		it('should create a random object with partial data when it is given', () => {
			expect(mockWithPartial.num).toBe(1);
			expect(mockWithPartial.str).toBe('test');
		});
	});
});
