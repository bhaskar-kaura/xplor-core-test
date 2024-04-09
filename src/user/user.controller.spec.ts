// src/user/user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { VerifyOtpDto } from './dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            sendOtp: jest.fn().mockResolvedValue({
              success: true,
              data: {
                key: 'b9f9602fdd7cc6b36efc5f855ab970df',
                otp: '191067',
              },
              message: 'OK',
            }),
            verifyOtp: jest.fn().mockResolvedValue({
              success: true,
              message: 'OK',
              data: {
                token:
                  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzE0NmMzNTJjLTNiMzEtNGNjYS04OWYwLTJlYjM4YWU4NGRiMCIsImlhdCI6MTcxMjU3OTM4OSwiZXhwIjoxNzE2MTc5Mzg5fQ.tT_Rx8f1eUiFSrXX6DNsUH9FiGrhGzl8m5Z7YD3i6ug',
                userId: 'user_146c352c-3b31-4cca-89f0-2eb38ae84db0',
              },
            }),
            resendOtp: jest.fn().mockResolvedValue({
              success: true,
              message: 'OK',
              data: {
                key: '8e7aec3366f6ce6fa4afa9cdde7857ea',
                otp: '123456',
              },
            }),
            findRoles: jest.fn().mockResolvedValue({
              success: true,
              message: 'OK',
              data: [
                {
                  _id: 'role_61b32a02-d422-4b10-b060-945e0e2e6418',
                  type: 'AGENT',
                  updated_at: '2024-04-05T13:16:27.007Z',
                  created_at: '2024-04-05T13:16:27.007Z',
                  __v: 0,
                },
                {
                  _id: 'role_8c47eb6a-840c-47bc-91a0-cfb9aee03cac',
                  type: 'SEEKER',
                  updated_at: '2024-04-05T13:16:27.009Z',
                  created_at: '2024-04-05T13:16:27.009Z',
                  __v: 0,
                },
              ],
            }),
            assignRole: jest.fn().mockResolvedValue({
              _id: 'user_146c352c-3b31-4cca-89f0-2eb38ae84db0',
              phoneNumber: '+919876546788',
              verified: true,
              kycStatus: false,
              wallet: null,
              updated_at: '2024-04-08T12:21:19.308Z',
              created_at: '2024-04-08T12:21:19.308Z',
              __v: 0,
              role: {
                _id: 'role_61b32a02-d422-4b10-b060-945e0e2e6418',
                type: 'AGENT',
                updated_at: '2024-04-05T13:16:27.007Z',
                created_at: '2024-04-05T13:16:27.007Z',
                __v: 0,
              },
            }),
            updateUserKyc: jest.fn().mockResolvedValue({
              success: true,
              message: 'OK',
              data: {
                _id: 'user_146c352c-3b31-4cca-89f0-2eb38ae84db0',
                phoneNumber: '+919876546788',
                verified: true,
                kycStatus: true,
                wallet: null,
                updated_at: '2024-04-08T12:21:19.308Z',
                created_at: '2024-04-08T12:21:19.308Z',
                __v: 0,
                role: 'role_61b32a02-d422-4b10-b060-945e0e2e6418',
                kyc: {
                  lastName: 'Doe',
                  firstName: 'John',
                  address: '123 Main St',
                  email: 'john.doe@example.com',
                  gender: 'Male',
                  provider: {
                    id: 'provider123',
                    name: 'Provider Name',
                  },
                  _id: 'kyc_ee7815ac-4c9c-4a8a-97df-5305a979d346',
                  updated_at: '2024-04-08T12:40:23.490Z',
                  created_at: '2024-04-08T12:40:23.490Z',
                },
              },
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendOtp', () => {
    it('should send OTP', async () => {
      const phoneNumberDto: PhoneNumberDto = {
        phoneNumber: '+919098987890',
      };
      expect(await controller.sendOtp(phoneNumberDto)).toEqual({
        success: true,
        data: {
          key: 'b9f9602fdd7cc6b36efc5f855ab970df',
          otp: '191067',
        },
        message: 'OK',
      });
    });
  });

  describe('verifyOtp', () => {
    it('should verify OTP', async () => {
      const verifyOtpDto: VerifyOtpDto = {
        key: 'b9f9602fdd7cc6b36efc5f855ab970df',
        otp: '191067',
      };
      expect(await controller.verifyOtp(verifyOtpDto)).toEqual({
        success: true,
        message: 'OK',
        data: {
          token:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzE0NmMzNTJjLTNiMzEtNGNjYS04OWYwLTJlYjM4YWU4NGRiMCIsImlhdCI6MTcxMjU3OTM4OSwiZXhwIjoxNzE2MTc5Mzg5fQ.tT_Rx8f1eUiFSrXX6DNsUH9FiGrhGzl8m5Z7YD3i6ug',
          userId: 'user_146c352c-3b31-4cca-89f0-2eb38ae84db0',
        },
      });
    });
  });

  describe('resendOtp', () => {
    it('should resend OTP', async () => {
      const resendOtpDto: ResendOtpDto = {
        key: 'b9f9602fdd7cc6b36efc5f855ab970df',
      };
      expect(await controller.resendOtp(resendOtpDto)).toEqual({
        success: true,
        message: 'OK',
        data: {
          key: '8e7aec3366f6ce6fa4afa9cdde7857ea',
          otp: '123456',
        },
      });
    });
  });
  describe('findRoles', () => {
    it('should find roles', async () => {
      expect(await controller.findRoles('token')).toEqual({
        success: true,
        message: 'OK',
        data: [
          {
            _id: 'role_61b32a02-d422-4b10-b060-945e0e2e6418',
            type: 'AGENT',
            updated_at: '2024-04-05T13:16:27.007Z',
            created_at: '2024-04-05T13:16:27.007Z',
            __v: 0,
          },
          {
            _id: 'role_8c47eb6a-840c-47bc-91a0-cfb9aee03cac',
            type: 'SEEKER',
            updated_at: '2024-04-05T13:16:27.009Z',
            created_at: '2024-04-05T13:16:27.009Z',
            __v: 0,
          },
        ],
      });
    });
  });
  describe('assignRole', () => {
    it('should assign role to user', async () => {
      const assignRoleDto: AssignRoleDto = {
        roleId: 'role_61b32a02-d422-4b10-b060-945e0e2e6418',
      };
      const token = 'mockToken';
      expect(await controller.assignRole(assignRoleDto, token)).toEqual({
        _id: 'user_146c352c-3b31-4cca-89f0-2eb38ae84db0',
        phoneNumber: '+919876546788',
        verified: true,
        kycStatus: false,
        wallet: null,
        updated_at: '2024-04-08T12:21:19.308Z',
        created_at: '2024-04-08T12:21:19.308Z',
        __v: 0,
        role: {
          _id: 'role_61b32a02-d422-4b10-b060-945e0e2e6418',
          type: 'AGENT',
          updated_at: '2024-04-05T13:16:27.007Z',
          created_at: '2024-04-05T13:16:27.007Z',
          __v: 0,
        },
      });
    });
  });

  describe('updateUserKyc', () => {
    it('should update user KYC', async () => {
      const token = 'mockToken';
      expect(await controller.updateUserKyc(token)).toEqual({
        success: true,
        message: 'OK',
        data: {
          _id: 'user_146c352c-3b31-4cca-89f0-2eb38ae84db0',
          phoneNumber: '+919876546788',
          verified: true,
          kycStatus: true,
          wallet: null,
          updated_at: '2024-04-08T12:21:19.308Z',
          created_at: '2024-04-08T12:21:19.308Z',
          __v: 0,
          role: 'role_61b32a02-d422-4b10-b060-945e0e2e6418',
          kyc: {
            lastName: 'Doe',
            firstName: 'John',
            address: '123 Main St',
            email: 'john.doe@example.com',
            gender: 'Male',
            provider: {
              id: 'provider123',
              name: 'Provider Name',
            },
            _id: 'kyc_ee7815ac-4c9c-4a8a-97df-5305a979d346',
            updated_at: '2024-04-08T12:40:23.490Z',
            created_at: '2024-04-08T12:40:23.490Z',
          },
        },
      });
    });
  });

  // Add more tests for other methods as needed
});
