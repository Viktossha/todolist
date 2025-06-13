import React from "react"
import s from "./Page404.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"

export const Page404 = () => {
  return (
    <div className={s.mainBlock}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Button component={Link} to={"/"} variant={"outlined"}>
        To the main page
      </Button>
    </div>
  )
}
