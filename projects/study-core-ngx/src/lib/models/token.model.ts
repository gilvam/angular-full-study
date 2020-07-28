import { JwtHelperService } from '@auth0/angular-jwt';

export class TokenModel {
  public createdTime: number;
  public accessToken: string;
  public tokenType: string;
  public refreshToken: string;
  public expiresIn: number;

  constructor(token?: any) {
    if (token) {
      this.createdTime = new Date().getTime();
      this.accessToken = token.access_token;
      this.tokenType = token.token_type;
      this.refreshToken = token.refresh_token;
      this.expiresIn = token.expires_in;
    }
  }

  public isExpired(): boolean {
    const jwtHelperService = new JwtHelperService();
    return jwtHelperService.isTokenExpired(this.accessToken);
  }
}


