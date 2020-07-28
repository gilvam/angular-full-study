import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../models/token.model';
import { NgForage } from 'ngforage';


@Injectable({ providedIn: 'root' })
export class CoreTokenService {

  public invalidTokenRequired = new EventEmitter<boolean>();

  private ACCESS_TOKEN = 'access_token';
  private REFRESH_TOKEN = 'refresh_token';
  private jwtHelperService = new JwtHelperService();

  constructor(private ngf: NgForage) {}

  public setToken(token: any): void {
    this.ngf.setItem(this.ACCESS_TOKEN, token.accessToken);
    // this.ngf.setItem(this.REFRESH_TOKEN, token.refreshToken);
  }

  public getAccessToken(): Promise<string> {
    return this.ngf.getItem(this.ACCESS_TOKEN);
  }

  public getRefreshToken() {
    return this.ngf.getItem(this.REFRESH_TOKEN);
  }

  public async getToken(): Promise<TokenModel> {
    return await this.ngf.getItem(this.ACCESS_TOKEN)
      .then((jwToken: string) => {
        const tokenInfo: TokenModel = Object.assign(new TokenModel(), jwToken);

        if (!tokenInfo.isExpired()) {
          return jwToken;
        }
        this.invalidTokenRequired.emit(true);
        return null;
      })
      .catch(() => {
        this.invalidTokenRequired.emit(true);
        return null;
      });
  }

  public clearToken() {
    return new Promise((resolve, reject) => {
      this.ngf.removeItem(this.ACCESS_TOKEN);
      this.ngf.removeItem(this.REFRESH_TOKEN);
      resolve();
    });
  }

  public async getTokenDecode(): Promise<any> {
    return await this.ngf.getItem(this.ACCESS_TOKEN)
      .then((jwToken: string) => {
        return this.jwtHelperService.decodeToken(jwToken);
      });
  }

  public async isTokenExpired(): Promise<boolean> {

    return await this.ngf.getItem(this.ACCESS_TOKEN)
      .then((jwToken: string) => {
        return this.jwtHelperService.isTokenExpired(jwToken);
      });

  }

}
