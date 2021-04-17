import { Router } from "express";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URI,
  process.env.SUPABASE_KEY
);

const router = Router();

router.get("/", (req, res) => {
  return res.send("hi");
});

router.post("/initgameover", async (req, res) => {
  return res.send("congrtats");
});

export default router;
