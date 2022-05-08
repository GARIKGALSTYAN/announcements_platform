import { Req, Res, RequestUserAuthData } from "./types";
import { StorageAPI } from "../storage";
import { UserRole } from "../shared";

export async function authMiddleware(req: Req, res: Res, next: Function) {
  res.locals.auth = false;

  console.log("authMiddleware call");

  console.log("cookies: ", req.cookies);

  const access_token = req.cookies && req.cookies.access_token;

  console.log({ access_token });

  if (typeof access_token === "string" || access_token.length !== 0) {
    console.log("acc token OS foundED");

    const access_tokens = await StorageAPI.AccessTokens.getMany({
      token: access_token,
      user_id: undefined,
    });

    console.log("access_tokens: ", access_tokens);
    const access_token_entity = access_tokens[0];
    console.log("access_token_entity: ", access_token_entity);

    // const role: UserRole = UserRole.USER

    if (access_token_entity &&
        access_token_entity.expiry_date.getTime() > Date.now()
    ) {
      res.locals.user_id = access_token_entity.user_id;

      const users = await StorageAPI.Users.getMany({
        user_id: access_token_entity.user_id
      });

      console.log("users: ", users);
      const user = users[0];

      console.log("user  : ", user);

      if (user) {
        res.locals.role = user.role;
      }
    }
  }

  if (res.locals.role && res.locals.user_id) {
    res.locals.auth = true;
  }

  next();
  console.log("\n\n locals after next: ", res.locals);
}
