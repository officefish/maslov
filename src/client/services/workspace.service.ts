import { useAxiosFetcher_GET } from './axios.service'

import useSWR from 'swr'
import { IWorkspace } from '../models/workspace.types'

const API_PREFIX = 'api/v1'

interface IWorkspaceListResponse {
  statusCode: string
  workspaces: IWorkspace[]
}

export function useUserWorkspacesSWR() {
  const route = 'workspace'
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({ api: API_PREFIX, route })

  const { data, error, isValidating, mutate } = useSWR<IWorkspaceListResponse>(
    key,
    fetcher,
  )

  return { workspaces: data.workspaces, error, isValidating, mutate }
}

// function useHook_POST_RawData({
//   api = 'api/v1/',
//   route = '/',
// } = {}) {
//   const {
//     onSubmit,
//     data: user,
//     serverError,
//   } = useAxios_POST_RawData<User>({
//     api,
//     route,
//   })
//   const router = useRouter()
//   const { mutate } = useUser()
//   useEffect(() => {
//     if (!user) return
//     mutate(user)
//       .then(() => {
//         router.push(redirect)
//       })
//       .catch(() => {
//         //console.log(e)
//       })
//   }, [user])
//   return { onSubmit, serverError }
// }

// export const useSignIn = () => useHook_POST_RawData({ route: 'sign-in' })
// export const useSignUp = () => useHook_POST_RawData({ route: 'sign-up' })
