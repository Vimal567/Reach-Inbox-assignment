
import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failed" }),
  (_, res) => res.redirect("https://vimal-reach-inbox.netlify.app")
);

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(200).json({ user: null });
  }
  res.json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("https://vimal-reach-inbox.netlify.app");
    });
  });
});

export default router;
