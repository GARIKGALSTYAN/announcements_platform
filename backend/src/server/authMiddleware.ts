import { Req, Res, RequestUserAuthData } from "./types";
import { StorageAPI } from "../storage";
import { UserRole } from "../shared";

export async function authMiddleware(req: Req, res: Res, next: Function) {
  res.locals.auth = false;

  let access_token = req.cookies && req.cookies.access_token;
  if (!access_token) {
    access_token = req.headers && req.headers.access_token;
  }


  if (typeof access_token === "string" && access_token.length !== 0) {
    const access_tokens = await StorageAPI.AccessTokens.getMany({
      token: access_token,
      user_id: undefined,
    });

    const access_token_entity = access_tokens[0];

    if (access_token_entity &&
        access_token_entity.expiry_date.getTime() > Date.now()
    ) {
      res.locals.user_id = access_token_entity.user_id;

      const users = await StorageAPI.Users.getMany({
        user_id: access_token_entity.user_id
      });

      const user = users[0];

      if (user) {
        res.locals.role = user.role;
      }
    }
  }

  if (res.locals.role && res.locals.user_id) {
    res.locals.auth = true;
  }

  next();
}
