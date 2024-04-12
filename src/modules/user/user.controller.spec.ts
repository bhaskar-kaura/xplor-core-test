// Import necessary modules and components for testing
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { VerifyOtpDto } from './dto';
import { faker } from '@faker-js/faker';

// Define the test suite for UserController
describe('UserController', () => {
  let controller: UserController;

  const findRoles = {
    success: true,
    message: 'OK',
    data: [
      {
        _id: `role_${faker.string.uuid()}`,
        type: faker.person.jobTitle(),
        updated_at: new Date(),
        created_at: new Date(),
        __v: 0,
      },
      {
        _id: `role_${faker.string.uuid()}`,
        type: faker.person.jobTitle(),
        updated_at: new Date(),
        created_at: new Date(),
        __v: 0,
      },
    ],
  };
  const sendOtp = {
    success: true,
    data: {
      key: faker.string.uuid(),
      otp: '191067',
    },
    message: 'OK',
  };

  const verifyOtp = {
    success: true,
    message: 'OK',
    data: {
      token: `Bearer jwt_token_${faker.string.uuid()}`,
      userId: `user_${faker.string.uuid()}`,
    },
  };
  const resendOtp = {
    success: true,
    message: 'OK',
    data: {
      token: `Bearer jwt_token_${faker.string.uuid()}`,
      userId: `user_${faker.string.uuid()}`,
    },
  };
  const assignRole = {
    _id: `user_${faker.string.uuid()}`,
    phoneNumber: faker.phone.number(),
    verified: true,
    kycStatus: false,
    wallet: null,
    updated_at: new Date(),
    created_at: new Date(),
    __v: 0,
    role: {
      _id: `role_${faker.string.uuid()}`,
      type: faker.person.jobTitle(),
      updated_at: new Date(),
      created_at: new Date(),
      __v: 0,
    },
  };
  const updateRole = {
    success: true,
    message: 'OK',
    data: {
      _id: `user_${faker.string.uuid()}`,
      phoneNumber: faker.phone.number(),
      verified: true,
      kycStatus: true,
      wallet: null,
      updated_at: new Date(),
      created_at: new Date(),
      __v: 0,
      role: `role_${faker.string.uuid()}`,
      kyc: {
        firstName: faker.person.firstName(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        gender: faker.person.gender(), // Randomly select 'Male' or 'Female' gender
        provider: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
        },
        _id: `kyc_${faker.string.uuid()}`,
        updated_at: new Date(),
        created_at: new Date(),
      },
    },
  };

  // Setup the testing module before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            sendOtp: jest.fn().mockResolvedValue(sendOtp),
            verifyOtp: jest.fn().mockResolvedValue(verifyOtp),
            resendOtp: jest.fn().mockResolvedValue(resendOtp),
            findRoles: jest.fn().mockResolvedValue(findRoles),
            assignRole: jest.fn().mockResolvedValue(assignRole),
            updateUserKyc: jest.fn().mockResolvedValue(updateRole),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // service = module.get<UserService>(UserService);
  });

  // Test to ensure the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test cases for each method in the UserController

  describe('sendOtp', () => {
    it('should send OTP', async () => {
      const phoneNumberDto: PhoneNumberDto = {
        phoneNumber: faker.phone.number(),
      };
      expect(await controller.sendOtp(phoneNumberDto)).toEqual(sendOtp);
    });
  });

  describe('verifyOtp', () => {
    it('should verify OTP', async () => {
      const verifyOtpDto: VerifyOtpDto = {
        key: faker.string.uuid(),
        otp: faker.number.int({ min: 100000, max: 999999 }).toString(),
      };
      expect(await controller.verifyOtp(verifyOtpDto)).toEqual(verifyOtp);
    });
  });

  describe('resendOtp', () => {
    it('should resend OTP', async () => {
      const resendOtpDto: ResendOtpDto = {
        key: faker.string.uuid(),
      };
      expect(await controller.resendOtp(resendOtpDto)).toEqual(resendOtp);
    });
  });
  describe('findRoles', () => {
    it('should find roles', async () => {
      expect(await controller.findRoles('token')).toEqual(findRoles);
    });
  });
  describe('assignRole', () => {
    it('should assign role to user', async () => {
      const assignRoleDto: AssignRoleDto = {
        roleId: `role_${faker.string.uuid()}`,
      };
      const token = 'mockToken';
      expect(await controller.assignRole(assignRoleDto, token)).toEqual(assignRole);
    });
  });

  describe('updateUserKyc', () => {
    it('should update user KYC', async () => {
      const token = 'mockToken';
      expect(await controller.updateUserKyc(token)).toEqual(updateRole);
    });
  });
});
