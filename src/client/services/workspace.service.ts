import { useAxiosFetcher_GET, useAxios_POST_RawData } from './axios.service'

import useSWRMutation from 'swr/mutation'
import { IWorkspace } from '../models/workspace.types'

const API_PREFIX = 'api/v1'

interface IWorkspaceListResponse {
  statusCode: string
  workspaces: IWorkspace[]
}

interface IWidget {
  workspaceId: string
  id: string
}

interface IWidgetData {
  api_function: string
  options?: string
}

interface IWorkspacePayload {
  title: string
  date: number
  widgets: IWidget[]
}
interface IWorkspaceResponse {
  statusCode: string
  payload: IWorkspacePayload
}

interface IWidgetPayload {
  api_function: string
  options?: string
}

interface IWidgetResponse {
  statusCode: string
  payload: IWidgetPayload
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

  return { workspaceData: data?.payload, trigger, error }
}

export function useWidgetDataSWR(widgetId: string) {
  const route = `widget/${widgetId}`
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({ api: API_PREFIX, route })

  const { data, error, trigger } = useSWRMutation<IWidgetResponse>(key, fetcher)

  return { widgetData: data?.payload, trigger, error }
}

export function useProviderDataSWR(widgetData: IWidgetData) {
  const route = `data/alpha-vintage/${widgetData?.api_function}`
  const key = `${API_PREFIX}/${route}`

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    withCredentials: true,
    params: widgetData?.options ? JSON.parse(widgetData.options) : {},
  }

  const { fetcher } = useAxiosFetcher_GET({ api: API_PREFIX, route, options })

  const { data, error, trigger } = useSWRMutation<IWorkspaceResponse>(
    key,
    fetcher,
  )

  return {
    providerData: data?.payload,
    providerTrigger: trigger,
    providerError: error,
  }
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

export const useNewWorkspace = () =>
  useHook_POST_RawData({ route: 'workspace' })

export const useNewWidget = () => useHook_POST_RawData({ route: 'widget' })
export const useUpdateWidget = () =>
  useHook_POST_RawData({ route: 'widget/update' })

// export const useSignUp = () => useHook_POST_RawData({ route: 'sign-up' })
