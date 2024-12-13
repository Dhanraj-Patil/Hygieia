import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"

export default axios.create(
    {
        baseURL: "http://localhost:3000"
    }
)