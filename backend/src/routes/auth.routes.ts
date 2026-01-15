
import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (_, res) => res.redirect("http://localhost:5173")
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
      res.redirect("http://localhost:5173");
    });
  });
});

export default router;
