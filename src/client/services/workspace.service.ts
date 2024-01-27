import { useAxiosFetcher_GET, useAxios_POST_RawData } from './axios.service'

import useSWRMutation from 'swr/mutation'
import { IWorkspace } from '../models/workspace.types'

const API_PREFIX = 'api/v1'

interface IWorkspaceListResponse {
  statusCode: string
  workspaces: IWorkspace[]
}

interface IWorkspacePayload {
  title: string
  date: number
}
interface IWorkspaceResponse {
  statusCode: string
  payload: IWorkspacePayload
}

export function useUserWorkspacesSWR() {
  const route = 'workspace'
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({ api: API_PREFIX, route })

  const { data, error, trigger } = useSWRMutation<IWorkspaceListResponse>(
    key,
    fetcher,
  )

  return { workspaces: data?.workspaces, error, trigger }
}

export function useWorkspaceDataSWR(workspaceId: string) {
  const route = `workspace/${workspaceId}`
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({ api: API_PREFIX, route })

  const { data, error, trigger } = useSWRMutation<IWorkspaceResponse>(
    key,
    fetcher,
  )

  return { data: data?.payload, trigger, error }
}

interface INewWorkspaceResponse {
  statusCode: number
}

function useHook_POST_RawData({ api = 'api/v1', route = 'workspace' } = {}) {
  const { onSubmit, data, serverError } =
    useAxios_POST_RawData<INewWorkspaceResponse>({
      api,
      route,
    })
  return { onSubmit, data, serverError }
}

export const useNewWorkspace = () => useHook_POST_RawData({})
// export const useSignUp = () => useHook_POST_RawData({ route: 'sign-up' })
