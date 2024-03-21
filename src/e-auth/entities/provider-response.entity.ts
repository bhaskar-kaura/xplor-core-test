import { ApiProperty } from '@nestjs/swagger';

export class ProviderEntity {
  @ApiProperty({ example: 'digilocker', description: 'Provider code' })
  code: string;

  @ApiProperty({ example: 'https://example.com/icon1.png', description: 'Icon link' })
  iconLink: string;

  @ApiProperty({ example: 'Provider 1', description: 'Provider title' })
  title: string;

  @ApiProperty({ example: 'Sub Title 1', description: 'Provider subtitle' })
  subTitle: string;

  @ApiProperty({
    example:
      'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?client_id=digilocker.DIGILOCKER_CLIENT_ID.1234&response_type=code&redirect_uri=https://27d9-115-240-127-98.ngrok-free.app/&state=d4376456-9650-40ff-8483-c5370af77d7e&dl_flow=signup&scope=openid&amr=all&purpose=kyc',
    description: 'Redirect URL for authentication',
  })
  redirectUrl: string;
}
