import {NextApiRequest, NextApiResponse} from "next"

// eslint-disable-next-line import/no-anonymous-default-export
export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id: 1, name: "Diogo"},
        {id: 2, name: "Antonio"},
        {id: 3, name: "Marcelo"}
    ]

    return response.json(users)
}